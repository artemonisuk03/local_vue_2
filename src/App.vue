<!-- template -->

<template>
  <!-- hidden stuff -->
  <div
    v-if="isModalLogIn || isModalSignUp"
    @click="((isModalLogIn = false), (isModalSignUp = false))"
    class="modal_shadow"
  >
    <div @click.stop v-if="isModalLogIn" class="modal_sign">
      <span class="sign_up_header">Вход</span>
      <input v-model="formData.email" type="email" placeholder="Почта" />
      <input v-model="formData.password" type="password" placeholder="Пароль" />
      <div class="adv_options">
        <span>Забыли пароль?</span>
        <span @click="SignUp()">Зарегистрироваться</span>
      </div>
      <button @click="handleLogIn()" type="button">Войти</button>
    </div>

    <div @click.stop v-if="isModalSignUp" class="modal_sign">
      <span class="sign_up_header">Регистрация</span>
      <input type="email" v-model="formData.email" placeholder="Почта" />
      <input type="password" v-model="formData.password" placeholder="Пароль" />
      <input type="password_repeat" v-model="password_repeat" placeholder="Повторение пароля" />
      <button @click="handleSignUp()" type="button">Зарегистрироваться</button>
      <div>{{ error }}</div>
    </div>
  </div>

  <!-- header -->

  <header>
    <!-- upper header -->

    <div class="header_upper">
      <div class="header_upper_contents">
        <div class="logo_main">
          <img src=".\assets\img_mainlogo.png" width="60" />
          <span>Молодёжка приморья</span>
        </div>

        <div class="account_main">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </div>
          <div>
            <svg
              @click="logIn()"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- lower header -->

    <div class="header_lower">
      <nav>
        <span href="">Новости</span>
        <span href="">Мероприятия</span>
        <span href="">Задания</span>
      </nav>
    </div>
  </header>

  <!-- main body -->

  <main>
    <div class="main_contents">
      <section class="banners">
        <router-view></router-view>
      </section>
      <section class="leaderboard"></section>
    </div>
  </main>

  <footer>
    <div class="footer_contents"></div>
  </footer>
</template>

<!-- script -->

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth_store.ts'
defineOptions({
  name: 'App',
})

const isModalLogIn = ref(false)
const isModalSignUp = ref(false)

const logIn = function () {
  isModalLogIn.value = true
}
const SignUp = function () {
  isModalSignUp.value = true
  isModalLogIn.value = false
}

// нейрокод регистрация --------------------------------------

const formData = reactive({
  email: '',
  password: '',
})

const authStore = useAuthStore()

const password_repeat = ref('')
const error = ref('')
const successMessage = ref('')
const loading = ref(false)

const handleSignUp = async () => {
  // Валидация
  if (!formData.email || !formData.password) {
    error.value = 'Заполните все поля'
    return
  }

  if (formData.password !== password_repeat.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  if (formData.password.length < 6) {
    error.value = 'Пароль должен содержать минимум 6 символов'
    return
  }

  // Очищаем сообщения
  error.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const result = await authStore.register(formData.email, formData.password)

    if (result.success) {
      successMessage.value = 'Регистрация успешна! Перенаправление...'

      // Перенаправляем на главную страницу через 2 секунды
      // setTimeout(() => {
      //   router.push('/dashboard')
      // }, 2000)
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'Произошла ошибка при регистрации'
  } finally {
    loading.value = false
  }
}

// нейрокод вход --------------------------------------

const handleLogIn = async () => {
  // Валидация
  if (!formData.email || !formData.password) {
    error.value = 'Заполните все поля'
    return
  }

  error.value = ''
  loading.value = true

  try {
    const result = await authStore.login(formData.email, formData.password)

    if (result.success) {
      // Перенаправление на запрошенную страницу или на главную
      // const redirectPath = router.query.redirect || '/dashboard'
      // router.push(redirectPath)
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'Произошла ошибка при входе'
  } finally {
    loading.value = false
  }
}
</script>

<!-- style -->

<style scoped>
button,
input,
select,
textarea {
  appearance: none;
  background: none;
  border: none;
  outline: none;
}

/* header upper */

header {
  position: fixed;
  width: 100%;
}

.header_upper {
  position: relative;
  height: 70px;
  display: flex;
  justify-content: center;
  z-index: 1;
  background-color: rgb(160, 125, 180);
}

.header_upper_contents {
  width: 1000px;
  display: flex;
  justify-content: space-between;
}

/* -- logo */

.logo_main {
  display: flex;
  align-items: center;
  padding-inline: 10px;
  cursor: pointer;
}
.logo_main span {
  color: white;
  font-size: 24px;
  margin-left: 8px;
  font-family: Nagel;
  /* font-weight: 400; */
}

/* -- account */

.account_main {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 10px;
}
.account_main div {
  width: 100%;
  height: 100%;
}
.account_main div svg {
  color: white;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* header lower */

.header_lower {
  position: relative;
  height: 100px;
  z-index: 0;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

nav {
  display: flex;
  width: 1000px;
  align-items: center;
}

nav span {
  height: 32px;
  font-size: 20px;
  margin-inline: 10px;
  align-content: center;
  font-family: Nagel;
  cursor: pointer;
  color: rgb(65, 65, 65);
  border-bottom: solid thin rgb(65, 65, 65);
}
/* main body */

main {
  box-sizing: border-box;
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(244, 243, 250);
}

.main_contents {
  padding-top: calc(100px + 70px);
  width: 1000px;
  display: flex;
  flex-direction: column;
}

.banners {
  height: 600px;
  background-color: aliceblue;
  margin-block: 30px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

.leaderboard {
  height: 400px;
  background-color: aliceblue;
  margin-block: 30px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

/* footer */

footer {
  background-color: rgb(74, 50, 83);
  height: 300px;
  width: 100%;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

/* modal window */

.modal_shadow {
  z-index: 5;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal_sign {
  position: relative;
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  margin-top: 16px;
  bottom: 100px;
  font-family: Nagel;
}

.sign_up_header {
  font-size: 1.5rem;
  padding: 16px;
  align-self: center;
}

.modal_sign input {
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
}

.adv_options span {
  cursor: pointer;
}

.modal_sign button {
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
}

.modal_sign button:hover {
  background-color: rgb(113, 42, 206);
  border: thin solid rgb(113, 42, 206);
  color: white;
}

@media screen and (max-width: 1000px) {
  main {
    padding-inline: 32px;
  }

  .main_contents {
    width: 100%;
  }

  .header_upper_contents {
    width: 100%;
  }

  .nav {
    width: 100%;
  }
}

@media screen and (max-width: 600) {
}
</style>
