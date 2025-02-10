import Cookies from 'js-cookie'
import { DEFAULT_COOKIE_AUTH_TOKEN_KEY } from '.'

export const getAuthTokenCookie =
  Cookies.get(DEFAULT_COOKIE_AUTH_TOKEN_KEY) ?? null

export const setAuthTokenCookie = (token: string): void => {
  if (!getAuthTokenCookie) {
    Cookies.set(DEFAULT_COOKIE_AUTH_TOKEN_KEY, token)
  }
}

export const removeAuthTokenCookie = (): void => {
  if (getAuthTokenCookie) {
    Cookies.remove(DEFAULT_COOKIE_AUTH_TOKEN_KEY)
  }
}
