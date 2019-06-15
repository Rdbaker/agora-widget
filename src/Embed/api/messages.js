import { API_URL } from 'shared/resources';
import { getCookie } from 'shared/helpers';


export const MessagesAPI = {
  getConversationMessages(conversationId, before) {
    let url = `${API_URL}/widget/conversations/${conversationId}/messages`;
    if (before) {
      url += `?before=${before}`;
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
      },
    })
  },

  sendMessage(conversationId, message) {
    return fetch(`${API_URL}/widget/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Agora-Client-Id': window.clientId,
        'Authorization': `Bearer ${getCookie()}`,
      },
      body: JSON.stringify({ message })
    });
  }
}