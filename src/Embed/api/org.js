import { API_URL } from 'shared/resources';


export const OrgAPI = {
  getPublicOrg() {
    return fetch(`${API_URL}/widget/orgs/${window.clientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
      },
    })
  },
}