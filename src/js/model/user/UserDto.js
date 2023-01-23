export default class UserDto{
  constructor(firstName, lastName, email, phone, username, password, newPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.newPassword = newPassword;
  }
}