import { API_URL } from 'shared/resources';


export const AuthAPI = {
  signUp(username, password) {
    return fetch(`${API_URL}/widget/end_users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
  },

  login(username, password) {
    return fetch(`${API_URL}/widget/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
  },
}