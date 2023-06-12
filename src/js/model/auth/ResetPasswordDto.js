export default class ResetPasswordDto{
  constructor(password, token) {
    this.password = password;
    this.token = token;
  }
}
