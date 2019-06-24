import { API_URL } from 'shared/resources';
import { checkStatus } from 'utils/api';


export const EndUserAPI = {
  getMe(token) {
    return fetch(`${API_URL}/widget/end_users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(checkStatus)
  },

  bulkGet(ids) {
    return fetch(`${API_URL}/widget/end_users?${ids.map(id => `ids[]=${id}&`).join('')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
      },
    })
    .then(checkStatus)
  }
}