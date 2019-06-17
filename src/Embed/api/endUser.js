import { API_URL } from 'shared/resources';
import { checkStatus } from 'utils/api';
import { getCookie } from 'shared/helpers';


export const EndUserAPI = {
  getMe() {
    return fetch(`${API_URL}/widget/end_users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
        'Authorization': `Bearer ${getCookie()}`,
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