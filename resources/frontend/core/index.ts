import httpClient from './http-client'

export {
  DEFAULT_REQUEST_TIMEOUT_IN_MS,
  DEFAULT_COOKIE_AUTH_TOKEN_KEY,
  DEFAULT_QUERY_STALE_TIME_IN_MS,
  HTTP_STATUS_CODE,
  QUERY_KEYS
} from './constant'

export {
  getAuthTokenCookie,
  setAuthTokenCookie,
  removeAuthTokenCookie
} from './auth-cookie'

export { httpClient }
