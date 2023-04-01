export default class Action {
  static CREATE = new Action("Create");
  static UPDATE = new Action("Update");

  constructor(value) {
    this.value = value;
  }
}