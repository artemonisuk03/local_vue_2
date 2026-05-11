import { defineStore } from 'pinia'
import authService from '@/services/api/auth_service.ts'
import axios from 'axios'

const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    //метод регистрации
    async register(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const tokens = await authService.register(email, password)
        this.setTokens(tokens.access_token, tokens.refresh_token)
        return { success: true, tokens }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    // метод входа
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const tokens = await authService.login(email, password)
        this.setTokens(tokens.access_token, tokens.refresh_token)

        //нет ещё функции
        await this.fetchCurrentUser()

        return { success: true, tokens }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    //добавление токенов в LocalStorage
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken

      localStorage.setItem('access_token', accessToken)
      // localStorage.setItem('refresh_token', refreshToken)
      this.setAuthorizationHeader(accessToken)
    },

    //добавление токена во все запросы (хз зачем)
    setAuthorizationHeader(token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    },

    // получение пользователя (пока что нет)
    async fetchCurrentUser() {},

    //пока что локально на фронте
    async logout() {
      this.accessToken = null
      // this.refreshToken = null //ничего не делает т.к refresh_token сразу в куки
      // this.user = null //ничего не делает?...
      localStorage.removeItem('access_token')
      this.setAuthorizationHeader(null)
    },

    clearError() {
      this.error = null
    },
  },
})

export { useAuthStore }
