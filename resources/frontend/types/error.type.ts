export type UserFormLoginErrors = {
  message: string,
  errors: {
    email: string[],
    password: string[]
  }
}
