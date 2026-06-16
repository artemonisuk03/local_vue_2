<template>
  <form
    @submit.prevent="handleLogIn"
    class="auth_form"
    :class="{ shake: isShaking }"
    @animationend="isShaking = false"
    novalidate
  >
    <span class="auth_form_header">Вход</span>

    <div class="input_wrapper" :class="{ field_error: fieldErrors.email }">
      <input @input.prevent type="email" v-model="form.email" placeholder="Почта" />
      <transition name="fade">
        <span v-if="fieldErrors.email" class="inline_error">{{ fieldErrors.email }}</span>
      </transition>
    </div>

    <div class="input_wrapper" :class="{ field_error: fieldErrors.password }">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="form.password"
        placeholder="Пароль"
      />
      <transition name="fade">
        <span v-if="fieldErrors.password" class="inline_error">{{ fieldErrors.password }}</span>
      </transition>
      <button type="button" class="eye_btn" @click="showPassword = !showPassword" tabindex="-1">
        <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </button>
    </div>

    <div class="adv_options">
      <span>Забыли пароль?</span>
      <RouterLink to="/register">Зарегистрироваться</RouterLink>
    </div>

    <button type="submit" class="primary_btn">Войти</button>
  </form>

  <div class="general_error_area">
    <transition name="fade">
      <div v-if="fieldErrors.general" class="general_error">
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
        {{ fieldErrors.general }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth_store.ts'

defineOptions({ name: 'LoginPage' })

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const fieldErrors = reactive({ email: '', password: '', general: '' })
const showPassword = ref(false)
const isShaking = ref(false)

function isEmailValid(str: string): boolean {
  const pattern = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/
  return pattern.test(str)
}

function isPasswordValid(str: string): boolean {
  const hasSpecial = /[^a-zA-Z0-9\s]/.test(str)
  const hasLetter  = /[a-zA-Z]/.test(str)
  const hasDigit   = /[0-9]/.test(str)
  return hasSpecial && hasLetter && hasDigit
}

async function triggerShake(): Promise<void> {
  isShaking.value = false
  await nextTick()
  isShaking.value = true
}

async function handleLogIn(): Promise<void> {
  fieldErrors.email   = ''
  fieldErrors.password = ''
  fieldErrors.general  = ''

  if (!form.email || !form.password) {
    fieldErrors.general = 'Заполните все поля'
    triggerShake()
    return
  }

  if (!isEmailValid(form.email)) {
    fieldErrors.email = 'Неверный email'
  }

  if (form.password.length < 12) {
    fieldErrors.password = 'Мин. 12 символов'
  } else if (!isPasswordValid(form.password)) {
    fieldErrors.password = 'Нужны цифры и символы'
  }

  if (authStore.isAuthenticated) {
    fieldErrors.general = 'Вы уже вошли. Сначала выйдите.'
  }

  const hasErrors = fieldErrors.email || fieldErrors.password || fieldErrors.general
  if (hasErrors) {
    triggerShake()
    return
  }

  try {
    const result = await authStore.login(form.email, form.password)
    if (result.success) {
      router.push('/')
    } else {
      fieldErrors.general = result.error
      triggerShake()
    }
  } catch {
    fieldErrors.general = 'Произошла ошибка при входе'
    triggerShake()
  }
}
</script>

<style scoped>
input,
button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
}

.auth_form {
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 24px;
  margin-top: 80px;
  margin-bottom: 40px;
  border-radius: 16px;
  font-family: Nagel;
  box-shadow: 0px 0px 30px 0px rgb(211, 211, 211);
}

.auth_form_header {
  font-size: 1.5rem;
  padding: 16px;
  align-self: center;
}

/* fields */

.input_wrapper {
  display: flex;
  align-items: center;
  border: thin solid rgb(180, 180, 180);
  border-radius: 16px;
  margin-block: 0.4rem;
  overflow: hidden;
  transition: border-color 0.15s;
}

.input_wrapper.field_error {
  border-color: rgb(204, 63, 75);
}

.input_wrapper input {
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
  font-size: 16px;
  font-family: Nagel;
}

.inline_error {
  flex-shrink: 0;
  padding-right: 8px;
  font-size: 11px;
  color: rgb(204, 63, 75);
  font-family: Nagel;
  max-width: 96px;
  line-height: 1.3;
  text-align: right;
}

.eye_btn {
  flex-shrink: 0;
  align-self: stretch;
  padding-inline: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgb(170, 170, 170);
  transition: color 0.15s;
}

.eye_btn:hover {
  color: rgb(160, 125, 180);
}

.eye_btn svg {
  width: 18px;
  height: 18px;
}

/* links below fields */

.adv_options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Nagel;
  font-size: 13px;
  color: rgb(150, 150, 150);
  padding-inline: 4px;
  margin-block: 0.3rem;
}

.adv_options a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  transition: color 0.15s;
}

.adv_options a:hover {
  color: rgb(160, 125, 180);
}

.adv_options span {
  cursor: pointer;
  transition: color 0.15s;
}

.adv_options span:hover {
  color: rgb(160, 125, 180);
}

/* buttons */

.primary_btn {
  background-color: white;
  border: thin solid black;
  font-size: 20px;
  margin-block: 0.4rem;
  padding: 10px;
  border-radius: 16px;
  transition:
    0.2s background-color,
    border,
    color;
  font-family: Nagel;
  cursor: pointer;
}

.primary_btn:hover {
  background-color: rgb(160, 125, 180);
  border: thin solid rgb(160, 125, 180);
  color: white;
}

/* general error */

.general_error_area {
  min-height: 46px;
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.general_error {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgb(204, 63, 75);
  color: white;
  font-size: 14px;
  font-family: Nagel;
  padding: 10px 12px;
  border-radius: 12px;
}

.general_error svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* transitions */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* shake animation */

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-8px);
  }
  40% {
    transform: translateX(8px);
  }
  60% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(5px);
  }
}

.shake {
  animation: shake 0.4s ease-in-out;
}

@media screen and (max-width: 440px) {
  .auth_form {
    width: calc(100vw - 32px);
    margin-top: 40px;
  }
}
</style>
