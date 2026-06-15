import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

class AuthService {
  // метод регистрации
  async register(email: string, password: string) {
    try {
      const response = await apiClient.post('api/auth/register', {
        email,
        password,
      })

      return response.data
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            throw new Error('Пользователь с таким email уже существует')
          case 422:
            throw new Error('Неверный формат логина или пароля')
        }
      }
      throw new Error('Ошибка соединения с сервером')
    }
  }

  //метод входа
  async login(email: string, password: string) {
    try {
      const response = await apiClient.post('api/auth/login', {
        email,
        password,
      })

      return response.data
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error('Неверный логин или пароль')
          case 422:
            throw new Error('Неверный формат логина или пароля')
        }
      }
      throw new Error('Ошибка соединения с сервером')
    }
  }

  async refresh() {
    const response = await apiClient.post('/api/auth/refresh')
    return response.data
  }

  async getEmail() {
    try {
      const token = localStorage.getItem('access_token')
      const response = await apiClient.get('/api/auth/email', {
        params: {
          access_token: token,
        },
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data)
      }
      throw new Error('Ошибка соединения с сервером')
    }
  }
}

export default new AuthService()
