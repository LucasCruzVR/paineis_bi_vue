import jwt_decode from "jwt-decode";

import AuthApi from "./AuthApi";

import { getWithExpiry, setWithExpiry } from "../helpers/localStorage";

const TOKEN_KEY = "aBYwLOl3gGO2AqQWdHNVdLqLAkpWBv2S";

export async function login(login, senha) {
  try {
    const authApi = new AuthApi();
    const token = await authApi.autenticar(login, senha);

    const decodedToken = jwt_decode(token);

    setWithExpiry(
      TOKEN_KEY,
      JSON.stringify(token),
      decodedToken.usuario.valido_por * 60000
    );
  } catch (err) {
    throw (err,
        "response.data.mensagem",
        "Usuário ou senha incorretos")
  }
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.log("err");
  }
}

export function isLoggedIn() {
  return !!getUsuario();
}

export function getUsuario() {
  const tokenString = getWithExpiry(TOKEN_KEY);
  if (tokenString) {
    const decodedToken = jwt_decode(tokenString);
    if (decodedToken) {
      return decodedToken.usuario;
    }
    return null;
  }
  return null;
}

export function getToken() {
  return getWithExpiry(TOKEN_KEY);
}