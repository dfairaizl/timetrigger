import fetch from "cross-fetch";
import { getIDToken } from "./auth";

export function createUser() {
  return getIDToken().then((token) => {
    return fetch(`${process.env.API_HOST}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
  });
}
