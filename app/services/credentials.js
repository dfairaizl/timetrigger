import fetch from 'cross-fetch';
import { getIDToken } from './auth';

const KEYS_API = `${process.env.API_HOST}/api/v1/user/api-key`;

export function fetchAPIKey (user) {
  return getIDToken().then((token) => {
    return fetch(KEYS_API, {
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
    return fetch(KEYS_API, {
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
