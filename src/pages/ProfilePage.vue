<template>
  <main>
    <div class="main_contents">
      <!-- profile hero -->
      <div class="card profile_hero">
        <div class="avatar">{{ avatarLetter }}</div>
        <div class="profile_info">
          <span class="profile_email">{{ userEmail }}</span>
          <span class="profile_role">{{ profileRole }}</span>
        </div>

        <div
          class="settings_trigger"
          @mouseenter="isSettingsMenuOpen = true"
          @mouseleave="isSettingsMenuOpen = false"
        >
          <transition name="fade" mode="out-in">
            <span v-if="!isSettingsMenuOpen" class="settings_label">Настройки аккаунта</span>
            <div v-else class="settings_menu">
              <RouterLink to="/settings?section=email" class="settings_menu_item">
                <PenIcon class="settings_menu_icon" />
                <span>Сменить почту</span>
              </RouterLink>
              <RouterLink to="/settings?section=password" class="settings_menu_item">
                <LockIcon class="settings_menu_icon" />
                <span>Сменить пароль</span>
              </RouterLink>
            </div>
          </transition>

          <RouterLink to="/settings" class="gear_link">
            <GearIcon class="gear_icon" :class="{ rotated: isSettingsMenuOpen }" />
          </RouterLink>
        </div>
      </div>

      <!-- stats -->
      <div class="stats_row">
        <div class="stat_card">
          <div class="stat_value">{{ completedTasks.length }}</div>
          <div class="stat_label">Выполнено заданий</div>
        </div>
        <div class="stat_card">
          <div class="stat_value">{{ totalPoints }}</div>
          <div class="stat_label">Суммарные баллы</div>
        </div>
        <div class="stat_card">
          <div class="stat_value">{{ averageGrade }}</div>
          <div class="stat_label">Средний балл</div>
        </div>
      </div>

      <!-- completed assignments -->
      <div class="card">
        <div class="card_header">
          <div>
            <span class="card_title">Выполненные задания</span>
            <p class="card_subtitle">Задания с выставленными оценками</p>
          </div>
        </div>
        <div v-if="completedTasks.length" class="grades_list">
          <div v-for="item in completedTasks" :key="item.id" class="grade_item">
            <div class="grade_main">
              <div class="grade_title">{{ item.title }}</div>
              <div class="grade_date">{{ formatDate(item.submitted_at!) }}</div>
            </div>
            <div class="grade_badge" :class="gradeColor(item.grade!)">
              {{ item.grade }}
            </div>
          </div>
        </div>
        <div v-else class="empty_state">Выполненных заданий пока нет</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth_store.ts'
import GearIcon from '@/assets/icons/gear.svg'
import PenIcon from '@/assets/icons/pen.svg'
import LockIcon from '@/assets/icons/lock.svg'

defineOptions({ name: 'ProfilePage' })

const authStore = useAuthStore()

const isSettingsMenuOpen = ref(false)

// TODO: update to fetch from API
const profileRole = ref('Студент')

const userEmail = computed(function () {
  return authStore.userEmail ?? ''
})

const avatarLetter = computed(function () {
  return userEmail.value.charAt(0).toUpperCase() || '?'
})

interface Task {
  id: number
  title: string
  submitted_at: string
  grade: number
}

const completedTasks = ref<Task[]>([
  { id: 1, title: 'Мероприятие 1', submitted_at: '2024-02-15T10:00:00', grade: 95 },
  { id: 2, title: 'Мероприятие 2', submitted_at: '2024-02-22T14:30:00', grade: 78 },
  {
    id: 3,
    title: 'Практическое задание',
    submitted_at: '2024-03-05T09:15:00',
    grade: 88,
  },
  { id: 4, title: 'Выступление', submitted_at: '2024-03-18T11:00:00', grade: 42 },
  { id: 5, title: 'Проведение мероприятия', submitted_at: '2024-04-01T16:00:00', grade: 91 },
])

const totalPoints = computed(function () {
  return completedTasks.value.reduce(function (sum, t) {
    return sum + t.grade
  }, 0)
})

const averageGrade = computed(function () {
  if (!completedTasks.value.length) return 0
  return Math.round(totalPoints.value / completedTasks.value.length)
})

function formatDate(str: string): string {
  return new Date(str).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function gradeColor(grade: number): string {
  if (grade >= 80) return 'grade_success'
  if (grade >= 50) return 'grade_warning'
  return 'grade_danger'
}
</script>

<style scoped>
main {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(244, 243, 250);
  min-height: 100vh;
}

.main_contents {
  padding-top: calc(100px + 70px);
  padding-bottom: 48px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* cards */

.card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  padding: 24px;
}

/* hero */

.profile_hero {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgb(160, 125, 180);
  color: white;
  font-family: Nagel;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile_info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile_email {
  font-family: Nagel;
  font-size: 20px;
  color: rgb(65, 65, 65);
}

.profile_role {
  font-family: Nagel;
  font-size: 13px;
  color: rgb(150, 150, 150);
}

/* settings trigger */

.settings_trigger {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings_label {
  font-family: Nagel;
  font-size: 14px;
  color: rgb(65, 65, 65);
  white-space: nowrap;
  text-decoration: underline;
}

.gear_link {
  display: flex;
  cursor: pointer;
}

.gear_icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  color: rgb(160, 125, 180);
  transition:
    transform 0.25s ease,
    color 0.15s;
}

.gear_link:hover .gear_icon {
  color: rgb(140, 105, 160);
}

.gear_icon.rotated {
  transform: rotate(90deg);
}

.settings_menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  height: 48px;
}

.settings_menu_item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Nagel;
  font-size: 13px;
  color: rgb(65, 65, 65);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s;
}

.settings_menu_item:hover {
  color: rgb(160, 125, 180);
}

.settings_menu_icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: rgb(160, 125, 180);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

/* stats */

.stats_row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat_card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat_value {
  font-family: Nagel;
  font-size: 2rem;
  color: rgb(160, 125, 180);
  line-height: 1;
}

.stat_label {
  font-family: Nagel;
  font-size: 13px;
  color: rgb(150, 150, 150);
}

/* completed assignments */

.card_header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.card_title {
  font-family: Nagel;
  font-size: 18px;
  color: rgb(65, 65, 65);
  display: block;
  margin-bottom: 4px;
}

.card_subtitle {
  font-family: Nagel;
  font-size: 13px;
  color: rgb(150, 150, 150);
  margin: 0;
}

.grades_list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.grade_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  background-color: rgb(244, 243, 250);
}

.grade_main {
  flex: 1;
}

.grade_title {
  font-family: Nagel;
  font-size: 14px;
  color: rgb(65, 65, 65);
  margin-bottom: 4px;
}

.grade_date {
  font-family: Nagel;
  font-size: 12px;
  color: rgb(150, 150, 150);
}

.grade_badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Nagel;
  font-size: 18px;
  color: white;
  flex-shrink: 0;
}

.grade_success {
  background-color: rgb(22, 163, 74);
}
.grade_warning {
  background-color: rgb(202, 138, 4);
}
.grade_danger {
  background-color: rgb(204, 63, 75);
}

.empty_state {
  padding: 32px 16px;
  text-align: center;
  font-family: Nagel;
  color: rgb(150, 150, 150);
  font-size: 14px;
}

/* responsive */

@media screen and (max-width: 1050px) {
  main {
    padding-inline: 32px;
  }

  .main_contents {
    width: 100%;
  }
}

@media screen and (max-width: 540px) {
  .main_contents {
    padding-top: 70px;
  }

  .stats_row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
