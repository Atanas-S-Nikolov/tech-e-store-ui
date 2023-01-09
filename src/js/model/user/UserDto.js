export default class UserDto{
  constructor(firstName, lastName, email, username, password, newPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.newPassword = newPassword;
  }
}