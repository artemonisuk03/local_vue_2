import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

class AuthService {
  // метод регистрации
  async register(email: string, password: string) {
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
      })

      return response.data
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          throw new Error('Пользователь с таким email уже существует')
        }
        throw new Error(error.response.data.message || 'Ошибка регистрации')
      }
      throw new Error('Ошибка соединения с сервером')
    }
  }

  // Добавляем метод входа
  async login(email: string, password: string) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      })

      // Предполагаем, что ответ содержит access_token и refresh_token
      return response.data
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Неверный email или пароль')
        }
        throw new Error(error.response.data.message || 'Ошибка входа')
      }
      throw new Error('Ошибка соединения с сервером')
    }
  }

  // Метод для выхода (опционально, можно вызвать на сервере)
  logout() {
    return Promise.resolve()
  }
}

export default new AuthService()
