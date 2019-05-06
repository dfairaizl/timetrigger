import fetch from 'cross-fetch';
import { getIDToken } from './auth';

export function fetchAPIKey (user) {
  return getIDToken().then((token) => {
    return fetch('http://localhost:8080/api/v1/user/api-key', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }).catch((e) => {
      console.error(e);
    });
  });
}

export function generateCredentails (user) {
  return getIDToken().then((token) => {
    return fetch('http://localhost:8080/api/v1/user/api-key', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }).catch((e) => {
      console.error(e);
    });
  });
}
