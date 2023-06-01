export default class UserDto{
  constructor(firstName, lastName, email, phone, address, username, password, newPassword, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.username = username;
    this.password = password;
    this.newPassword = newPassword;
    this.role = role;
  }
}