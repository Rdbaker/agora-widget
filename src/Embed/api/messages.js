import { API_URL } from 'shared/resources';


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
}