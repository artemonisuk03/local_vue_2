<template>
  <form @submit.prevent="handleLogIn" class="auth_form" novalidate>
    <span class="auth_form_header">Вход</span>
    <input @input.prevent v-model="form.email" type="email" placeholder="Почта" />
    <input v-model="form.password" type="password" placeholder="Пароль" />
    <div class="adv_options">
      <span>Забыли пароль?</span>
      <RouterLink to="/register">Зарегистрироваться</RouterLink>
    </div>
    <button type="submit">Войти</button>

    <div class="errors">
      <div v-for="error in errors" class="error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <div>{{ error }}</div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth_store.ts'

defineOptions({ name: 'LoginPage' })

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const errors = ref<string[]>([])

const isEmailValid = (str: string) => /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/.test(str)
const isPasswordValid = (str: string) =>
  /[^a-zA-Z0-9\s]/.test(str) && /[a-zA-Z]/.test(str) && /[0-9]/.test(str)

const handleLogIn = async () => {
  errors.value = []

  if (!form.email || !form.password) {
    errors.value.push('Заполните все поля')
    return
  }
  if (!isEmailValid(form.email)) errors.value.push('Неверный формат email.')
  if (form.password.length < 12) {
    errors.value.push('Пароль должен содержать минимум 12 символов.')
  } else if (!isPasswordValid(form.password)) {
    errors.value.push('Пароль должен включать цифры, буквы и специальные символы.')
  }
  if (authStore.isAuthenticated) errors.value.push('Вы уже вошли. Сначала выйдите.')
  if (errors.value.length !== 0) return

  try {
    const result = await authStore.login(form.email, form.password)
    if (result.success) {
      router.push('/')
    } else {
      errors.value.push(result.error)
    }
  } catch {
    errors.value.push('Произошла ошибка при входе')
  }
}
</script>

<style scoped>
button,
input {
  appearance: none;
  background: none;
  border: none;
  outline: none;
}

.auth_form {
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-family: Nagel;
  box-shadow: 0px 0px 30px 0px rgb(211, 211, 211);
}

.auth_form_header {
  font-size: 1.5rem;
  padding: 16px;
  align-self: center;
}

.auth_form input {
  box-sizing: border-box;
  border: thin solid black;
  font-size: 16px;
  margin: 0.5rem;
  padding: 16px;
  border-radius: 16px;
  font-family: Nagel;
}

.adv_options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: bahnschrift;
  padding-inline: 0.5rem;
}

.adv_options a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.adv_options span {
  cursor: pointer;
}

.auth_form button {
  background-color: white;
  border: thin solid black;
  font-size: 20px;
  margin: 0.5rem;
  padding: 8px;
  border-radius: 16px;
  transition:
    0.2s background-color,
    border,
    color;
  font-family: Nagel;
  cursor: pointer;
}

.auth_form button:hover {
  background-color: rgb(160, 125, 180);
  border: thin solid rgb(160, 125, 180);
  color: white;
}

.errors {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

.error {
  height: 24px;
  background-color: rgb(204, 63, 75);
  font-size: 16px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Nagel;
  padding-block: 12px;
  border-radius: 24px;
  padding-inline: 12px;
  margin-block: 4px;
}

.error svg {
  height: 100%;
  /* flex-shrink: 0; */
}

.error div {
  margin-inline: 4px;
}
</style>
