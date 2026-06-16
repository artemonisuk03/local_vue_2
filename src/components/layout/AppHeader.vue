<template>
  <header>
    <!-- upper header -->
    <div class="header_upper">
      <div class="header_upper_contents">
        <RouterLink to="/" class="logo_main">
          <img src="@/assets/img_mainlogo.png" />
          <span>Молодёжка приморья</span>
        </RouterLink>

        <div class="account_main">
          <!-- Не авторизован: только иконка профиля → /login -->
          <template v-if="!isAuthenticated">
            <div @click="router.push('/login')">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </template>

          <!-- Авторизован: bell (rightmost) → logout → email (leftmost) при row-reverse -->
          <template v-else>
            <div ref="bellIconRef" @click="toggleNotifications">
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </div>

            <div @click="authStore.logout()">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
                  fill="currentColor"
                />
                <path
                  d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
                  fill="currentColor"
                />
                <path
                  d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <span @click="router.push('/profile')" class="user_email">{{ userEmail }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- notifications panel -->
    <div v-if="isNotificationsOpen" class="notifications_panel" :style="notificationsPanelStyle">
      <div v-if="notifications.length === 0" class="notifications_empty">Нет уведомлений</div>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification_item"
      >
        {{ notification.message }}
      </div>
    </div>

    <!-- lower header (desktop + tablet) -->
    <div v-if="isDesktop || isTablet" class="header_lower">
      <nav class="nav_desktop">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/news">Новости</RouterLink>
        <RouterLink to="/events">Мероприятия</RouterLink>
        <RouterLink to="/tasks">Задания</RouterLink>
      </nav>
    </div>

    <!-- mobile navigation -->
    <div v-if="isMobile" class="mobile_footer">
      <nav class="nav_mobile">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/news">Новости</RouterLink>
        <RouterLink to="/events">Мероприятия</RouterLink>
        <RouterLink to="/tasks">Задания</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth_store.ts'
import { useBreakpoints } from '@vueuse/core'

const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userEmail = computed(() => authStore.userEmail)

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 540,
  desktop: 1050,
})

const isDesktop = breakpoints.greater('desktop')
const isTablet = breakpoints.between('tablet', 'desktop')
const isMobile = breakpoints.smaller('tablet')

const bellIconRef = ref<HTMLDivElement | null>(null)
const isNotificationsOpen = ref(false)
const bellCoords = ref({ top: 0, left: 0 })

const notifications = ref<Array<{ id: number; message: string }>>([])

const toggleNotifications = () => {
  const rect = bellIconRef.value!.getBoundingClientRect()
  bellCoords.value = {
    top: rect.bottom + window.scrollY + 5,
    left: rect.left + window.scrollX - 4,
  }
  isNotificationsOpen.value = !isNotificationsOpen.value
}

const notificationsPanelStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${bellCoords.value.top}px`,
  left: `${bellCoords.value.left}px`,
}))
</script>

<style scoped>
header {
  z-index: 2;
  position: fixed;
  width: 100%;
}

/* notifications panel */

.notifications_panel {
  position: fixed;
  width: 250px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  border-radius: 8px;
  overflow: hidden;
}

.notifications_empty {
  padding: 20px 16px;
  font-family: Nagel;
  color: rgb(150, 150, 150);
  text-align: center;
}

.notification_item {
  padding: 12px 16px;
  font-family: Nagel;
  border-bottom: thin solid rgb(230, 230, 230);
}

/* upper header */

.header_upper {
  position: relative;
  height: 70px;
  display: flex;
  justify-content: center;
  z-index: 6;
  background-color: rgb(160, 125, 180);
}

.header_upper_contents {
  width: 1000px;
  display: flex;
  justify-content: space-between;
}

/* logo */

.logo_main {
  display: flex;
  align-items: center;
  padding-inline: 10px;
  cursor: pointer;
  text-decoration: none;
}

.logo_main img {
  height: 90%;
}

.logo_main span {
  color: white;
  font-size: 24px;
  margin-left: 8px;
  font-family: Nagel;
}

/* account */

.account_main {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.account_main div {
  padding-block: 10px;
  padding-inline: 4px;
  height: 100%;
  cursor: pointer;
}

.account_main div svg {
  color: white;
  width: 100%;
  height: 100%;
}

.user_email {
  color: white;
  font-size: 16px;
  font-family: Nagel;
  cursor: pointer;
  margin-inline: 8px;
  white-space: nowrap;
}

/* lower header */

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

.nav_desktop a {
  height: 32px;
  font-size: 20px;
  margin-inline: 10px;
  align-content: center;
  font-family: Nagel;
  cursor: pointer;
  color: rgb(65, 65, 65);
  border-bottom: solid thin rgb(65, 65, 65);
  text-decoration: none;
}

.nav_desktop a.router-link-active {
  color: rgb(160, 125, 180);
  border-bottom-color: rgb(160, 125, 180);
}

/* mobile navigation */

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

.nav_mobile a {
  height: 32px;
  font-size: 20px;
  margin-inline: 10px;
  align-content: center;
  font-family: Nagel;
  cursor: pointer;
  color: rgb(65, 65, 65);
  border-bottom: solid thin rgb(65, 65, 65);
  text-decoration: none;
}

.nav_mobile a.router-link-active {
  color: rgb(160, 125, 180);
  border-bottom-color: rgb(160, 125, 180);
}

/* tablet / desktop responsive */

@media screen and (max-width: 1050px) and (min-width: 540px) {
  .header_upper_contents {
    width: 100%;
  }
}
</style>
