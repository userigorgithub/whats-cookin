class User {
  constructor(singleUser) {
    this.singleUser = singleUser;
  }

  returnUserFirstName() {
    const splitName = this.singleUser.name.split(" ");
    return splitName[0];
  }




//to add: favories & toCook:
//create property empty array
//

//to remove: favorites & toCook:
//



}

export default User;
