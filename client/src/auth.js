// NOTE: this example keeps the access token in LocalStorage just because it's simpler
// but in a real application you may want to use cookies instead for better security

import { graphqlRequest } from "./api";

const accessTokenKey = "accessToken";

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export async function login(email, password) {
  const mutation = `
    mutation loginMutation($args: loginInput) {
      token: login(args: $args)
    } 
  `;
  const payload = {
    email,
    password,
  };

  try {
    const data = await graphqlRequest(mutation, {
      args: payload,
    });
    console.log({ data });
    localStorage.setItem(accessTokenKey, data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem(accessTokenKey);
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
}
