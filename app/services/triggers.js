import fetch from "cross-fetch";
import { getIDToken } from "./auth";

export function createTrigger(data) {
  return getIDToken().then((token) => {
    return fetch(`${process.env.API_HOST}/api/v1/trigger`, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });
}
