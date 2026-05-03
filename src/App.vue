<!-- script -->

<script setup>
import { reactive, ref } from 'vue'
defineOptions({
  name: 'App',
})

const isLoggingIn = ref(false)
const isSigningUp = ref(false)

const logIn = function () {
  isLoggingIn.value = true
}
const SignUp = function () {
  isSigningUp.value = true
  isLoggingIn.value = false
}
</script>

<!-- template -->

<template>
  <!-- hidden stuff -->
  <div v-if="isLoggingIn" class="modal_shadow">
    <div class="sign_up">
      <div class="sign_up_header">Вход</div>
      <input type="text" class="text_field" placeholder="Почта" />
      <input type="text" class="text_field" placeholder="Пароль" />
      <div class="adv_options">
        <span>Забыли пароль?</span>
        <span @click="SignUp()">Зарегистрироваться</span>
      </div>
      <button type="button" class="text_field">Войти</button>
    </div>
  </div>

  <div v-if="isSigningUp" class="modal_shadow">
    <div class="sign_up">
      <div class="sign_up_header">Регистрация</div>
      <input type="text" class="text_field" placeholder="Почта" />
      <input type="text" class="text_field" placeholder="Пароль" />
      <input type="text" class="text_field" placeholder="Повторение пароля" />
      <button type="button" class="text_field">Зарегистрироваться</button>
    </div>
  </div>

  <!-- header -->

  <header>
    <!-- upper header -->

    <div class="header_upper">
      <div class="header_upper_contents">
        <div class="logo_main">
          <img src=".\assets\img_mainlogo.png" width="50" />
          <span>Молодёжка приморья</span>
        </div>

        <div class="account_main">
          <a href="">
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z"
                fill="#000000"
              />
            </svg>
          </a>
          <a href="">
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H14.5C17.5376 13 20 15.4624 20 18.5V21M8 21V18M16 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5Z"
                stroke="#000000"
                stroke-linecap="round"
                stroke-width="1.4"
              />
            </svg>
          </a>
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
      <div class="banners">
        <router-view></router-view>
      </div>
      <div class="leaderboard"></div>
    </div>
  </main>

  <footer>
    <div class="footer_contents"></div>
  </footer>
</template>

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
  background-color: rgb(38, 94, 134);
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
  font-family: Nagel condensed;
  font-weight: 400;
}

/* -- account */

.account_main {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 10px;
}
.account_main a {
  width: 100%;
  height: 100%;
}
.account_main a svg {
  filter: invert(100%);
  width: 100%;
  height: 100%;
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
  font-family: bahnschrift light;
  cursor: pointer;
  border-bottom: solid thin rgb(0, 0, 0);
}
/* main body */

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(233, 233, 233);
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
  background-color: rgb(50, 54, 83);
  height: 300px;
  width: 1000px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
}
</style>
