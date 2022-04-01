class User {
  constructor(singleUser) {
    this.singleUser = singleUser;
  }

  returnUserFirstName() {
    const splitName = this.singleUser.name.split(" ");
    return splitName[0];
  }

}

export default User;
