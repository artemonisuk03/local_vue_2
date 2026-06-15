import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth_store'

export function useAuth() {
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const userEmail = computed(() => authStore.userEmail)
  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.error)

  const login = async (email, password) => {
    return await authStore.login(email, password)
  }

  const register = async (email, password) => {
    return await authStore.register(email, password)
  }

  const logout = () => {
    authStore.logout()
  }

  return {
    isAuthenticated,
    userEmail,
    loading,
    error,
    login,
    register,
    logout,
  }
}
