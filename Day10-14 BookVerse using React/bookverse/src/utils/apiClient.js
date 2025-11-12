// apiClient.js - tiny wrapper around fetch for json-server
const apiBase = 'http://localhost:8000';

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    const err = new Error('API error: ' + res.status + ' ' + text);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
};

const get = (path) => fetch(apiBase + path).then(handleResponse);
const post = (path, data) =>
  fetch(apiBase + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

const put = (path, data) =>
  fetch(apiBase + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

const del = (path) =>
  fetch(apiBase + path, { method: 'DELETE' }).then(handleResponse);

export default { get, post, put, del };
