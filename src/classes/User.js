class User {
  constructor(singleUser) {
    this.singleUser = singleUser;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
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

  deleteFromFavorites(id) {
    const targetIndex = this.favoriteRecipes.find((favRecipe) => {
      return favRecipe.id === id;
    })
    if (targetIndex) {
      this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(targetIndex),1);
    }
  }

  addToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe)
    }
  }

  deleteFromCook(id) {
    const targetIndex = this.recipesToCook.find((toCookRecipe) => {
      return toCookRecipe.id === id;
    })
    if (targetIndex) {
      this.recipesToCook.splice(this.recipesToCook.indexOf(targetIndex),1);
    }
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




export default User;
