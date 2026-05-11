<!-- template -->

<template>
  <!-- hidden stuff -->
  <div
    v-if="isModalLogIn || isModalSignUp"
    @mousedown="closeModalAuth"
    @keydown.esc="closeModalAuth"
    class="modal_shadow"
  >
    <form
      @submit.prevent.stop="handleLogIn()"
      @mousedown.stop
      v-if="isModalLogIn"
      class="modal_auth"
    >
      <span class="modal_auth_header">Вход</span>
      <input v-model="formLogIn.email" type="email" placeholder="Почта" />
      <input v-model="formLogIn.password" type="password" placeholder="Пароль" />
      <div class="adv_options">
        <span>Забыли пароль?</span>
        <span @click="goToSignUp">Зарегистрироваться</span>
      </div>
      <button type="submit">Войти</button>
    </form>

    <form
      @submit.prevent.stop="handleSignUp()"
      @mousedown.stop
      v-if="isModalSignUp"
      class="modal_auth"
    >
      <span class="modal_auth_header">Регистрация</span>
      <input type="email" v-model="formSignUp.email" placeholder="Почта" />
      <input type="password" v-model="formSignUp.password" placeholder="Пароль" />
      <input type="password" v-model="formSignUp.password_repeat" placeholder="Повторение пароля" />
      <button type="submit">Зарегистрироваться</button>
    </form>

    <div class="modal_errors">
      <div v-for="error in errors" class="modal_error">
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
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <div>
          {{ error }}
        </div>
      </div>
    </div>
  </div>

  <!-- header -->

  <header>
    <!-- upper header -->

    <div class="header_upper">
      <div class="header_upper_contents">
        <div class="logo_main">
          <img src=".\assets\img_mainlogo.png" />
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
              @click="isModalLogIn = true"
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

    <div v-if="isDesktop || isTablet" class="header_lower">
      <nav class="nav_desktop">
        <span href="">Новости</span>
        <span href="">Мероприятия</span>
        <span href="">Задания</span>
      </nav>
    </div>

    <!-- mobile navigation -->

    <div v-if="isMobile" class="mobile_footer">
      <nav class="nav_mobile">
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
        <swiper :pagination="true" :modules="modules" class="swiper_carousel">
          <swiper-slide> <img src=".\assets\images\beach.jpg" class="swiper_image" /></swiper-slide>
          <swiper-slide
            ><img src=".\assets\images\starfish.jpg" class="swiper_image"
          /></swiper-slide>
        </swiper>
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
import { useEventListener, useBreakpoints } from '@vueuse/core'
defineOptions({
  name: 'App',
})

const isModalLogIn = ref(false)
const isModalSignUp = ref(false)

const errors = ref([])
// const error = ref('')
const successMessage = ref('')

const authStore = useAuthStore()

const closeModalAuth = function () {
  isModalLogIn.value = false
  isModalSignUp.value = false
  errors.value = []
}

const goToSignUp = function () {
  isModalLogIn.value = false
  isModalSignUp.value = true
  errors.value = []
}

// Swiper

import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

const modules = [Pagination]

// breakpoints

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 540,
  desktop: 1050,
})

const isDesktop = breakpoints.greater('desktop')
const isTablet = breakpoints.between('tablet', 'desktop')
const isMobile = breakpoints.smaller('tablet')

// нейрокод регистрация --------------------------------------

const formLogIn = reactive({
  email: '',
  password: '',
})

const formSignUp = reactive({
  email: '',
  password: '',
  password_repeat: '',
})

useEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModalAuth()
  }
})

const handleSignUp = async () => {
  errors.value = []
  // Валидация
  if (!formSignUp.email || !formSignUp.password) {
    errors.value.push('Заполните все поля')
  }

  if (formSignUp.password !== formSignUp.password_repeat) {
    errors.value.push('Пароли не совпадают')
  }

  if (formSignUp.password.length < 6) {
    errors.value.push('Пароль должен содержать минимум 6 символов')
  }

  if (errors.value.length !== 0) {
    return
  }

  // Очищаем сообщения
  errors.value = []
  successMessage.value = ''

  try {
    const result = await authStore.register(formSignUp.email, formSignUp.password)

    if (result.success) {
      closeModalAuth()
    } else {
      errors.value.push(result.error)
    }
  } catch (err) {
    errors.value.push('Произошла ошибка при регистрации')
  }
}

// нейрокод вход --------------------------------------

const handleLogIn = async () => {
  errors.value = []
  // Валидация
  if (!formLogIn.email || !formLogIn.password) {
    errors.value.push('Заполните все поля')
    return
  }

  if (errors.value.length !== 0) {
    return
  }

  errors.value = []
  try {
    const result = await authStore.login(formLogIn.email, formLogIn.password)

    if (result.success) {
      closeModalAuth()
    } else {
      errors.value.push(result.error)
    }
  } catch (err) {
    errors.value.push('Произошла ошибка при входе')
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
  z-index: 2;
  position: fixed;
  width: 100%;
}

.header_upper {
  position: relative;
  height: 70px;
  display: flex;
  justify-content: center;
  z-index: 5;
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
.logo_main img {
  height: 90%;
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
  z-index: 4;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

.nav_desktop {
  display: flex;
  width: 1000px;
  align-items: center;
}

.nav_desktop span {
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

/* swiper carousel */

.banners {
  height: 600px;
  /* background-color: aliceblue; */
  margin-block: 30px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  border-radius: 16px;
}

.swiper_carousel {
  height: 100%;
  width: 100%;
  border-radius: 16px;
  z-index: 0;
}

.swiper_image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.leaderboard {
  height: 500px;
  background-color: white;
  margin-block: 30px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  border-radius: 16px;
}

/* footer */

footer {
  background-color: rgb(74, 50, 83);
  height: 300px;
  width: 100%;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

/* mobile footer */

.mobile_footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 100px;
  z-index: 4;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}

.nav_mobile {
  display: flex;
  justify-content: space-evenly;
  width: 1000px;
  align-items: center;
}

.nav_mobile span {
  height: 32px;
  font-size: 20px;
  margin-inline: 10px;
  align-content: center;
  font-family: Nagel;
  cursor: pointer;
  color: rgb(65, 65, 65);
  border-bottom: solid thin rgb(65, 65, 65);
}

/* modal window */

.modal_shadow {
  z-index: 5;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal_auth {
  position: relative;
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  margin-top: 200px;
  font-family: Nagel;
}

.modal_auth_header {
  font-size: 1.5rem;
  padding: 16px;
  align-self: center;
}

.modal_auth input {
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

.modal_auth button {
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

.modal_auth button:hover {
  background-color: rgb(160, 125, 180);
  border: thin solid rgb(160, 125, 180);
  color: white;
}

/* modal errors */

.modal_errors {
  margin-top: 100px;
  max-width: 80%;
}

.modal_error {
  height: 24px;
  background-color: rgb(204, 63, 75);
  font-size: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Nagel;
  padding-block: 12px;
  border-radius: 24px;
  padding-inline: 12px;
  margin-block: 12px;
}

.modal_error svg {
  height: 100%;
}

.modal_error div {
  margin-inline: 4px;
}

@media screen and (max-width: 1050px) and (min-width: 540px) {
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

@media screen and (max-width: 540px) {
  main {
    padding-inline: 32px;
  }

  .main_contents {
    width: 100%;
    padding-top: 70px;
  }
}
</style>
