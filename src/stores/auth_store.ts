import { defineStore } from 'pinia'
import authService from '@/services/api/auth_service.ts'
import axios from 'axios'

const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    userEmail: null,
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
        this.setAccessToken(tokens.access_token, tokens.refresh_token)
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
        this.setAccessToken(tokens.access_token, tokens.refresh_token)

        await this.fetchUserEmail()

        return { success: true, tokens }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    //добавление токенов в LocalStorage
    setAccessToken(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken

      localStorage.setItem('access_token', accessToken)
      this.setAuthorizationHeader(accessToken)
    },

    setAuthorizationHeader(token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    },

    async fetchUserEmail(token) {
      try {
        const data = await authService.getEmail(token)
        this.userEmail = data.email
      } catch (error) {
        console.error('Failed to fetch email:', error)
      }
    },

    async logout() {
      this.accessToken = null
      localStorage.removeItem('access_token')
      this.userEmail = null
      this.setAuthorizationHeader(null)
    },
  },
})

export { useAuthStore }
