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
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
  },

  actions: {
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

    // Добавляем метод входа
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const tokens = await authService.login(email, password)
        this.setTokens(tokens.access_token, tokens.refresh_token)

        // Здесь можно получить данные пользователя
        await this.fetchCurrentUser()

        return { success: true, tokens }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken

      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      this.setAuthHeader(accessToken)
    },

    setAuthHeader(token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    },

    // Метод для получения текущего пользователя
    async fetchCurrentUser() {
      try {
        const response = await axios.get('/api/users/me')
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    },

    async logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.setAuthHeader(null)
    },

    clearError() {
      this.error = null
    },
  },
})

export { useAuthStore }
