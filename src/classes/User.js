class User {
  constructor(singleUser) {
    this.singleUser = singleUser;
    this.favoriteRecipes = [];
  }

  returnUserFirstName() {
    const splitName = this.singleUser.name.split(" ");
    return splitName[0];
  }

  addToFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    }
  }



//to add: addToFavorite & addToCook:
//create property empty array
//!includes? in array
//push

//to remove: removeFromFavorite & removeFromCook:
//forEach in array
//user.singleUser.id matches id para?
//splice from array



}

export default User;
