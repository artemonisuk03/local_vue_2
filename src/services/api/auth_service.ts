import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
}) //вынести в отдельный файл можно

class AuthService {
  // метод регистрации
  async register(email: string, password: string) {
    //async значит что функция может выполняться параллельно, её не ждут
    try {
      const response = await apiClient.post('api/auth/register', {
        //await наоборот значит что выполнение кода не продолжится пока не завершится выполнение функции
        email,
        password,
      })

      return response.data
      //ошибки
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

  //Сделать интерфейсы для email, password, token

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
  logout() {
    return Promise.resolve()
  }
}

export default new AuthService()
