const API_BASE_URL = '/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};

export const apiService = {
  getFighters: () => fetch(`${API_BASE_URL}/fighters`).then(handleResponse),
  getFighterById: (id: string) => fetch(`${API_BASE_URL}/fighters/${id}`).then(handleResponse),
  getEvents: () => fetch(`${API_BASE_URL}/events`).then(handleResponse),
  getEventById: (id: string) => fetch(`${API_BASE_URL}/events/${id}`).then(handleResponse),
  getNews: () => fetch(`${API_BASE_URL}/news`).then(handleResponse),
  getNewsById: (id: string) => fetch(`${API_BASE_URL}/news/${id}`).then(handleResponse),
  getComments: (postId: string) => fetch(`${API_BASE_URL}/comments?postId=${postId}`).then(handleResponse),
  postComment: (comment: { postId: string; author: string; content: string }) => {
    return fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    }).then(handleResponse);
  },
  login: (credentials: { email: string; pass: string }) => {
    return fetch(`${API_BASE_URL}/users?email=${credentials.email}&password=${credentials.pass}`).then(handleResponse);
  },
  register: (userData: { name: string; email: string; pass: string }) => {
    return fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(handleResponse);
  },
};
