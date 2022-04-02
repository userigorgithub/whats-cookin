class User {
  constructor(singleUser) {
    this.singleUser = singleUser;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  returnUserFirstName() {
    const splitName = this.singleUser.name.split(' ');
    return splitName[0];
  }

  addToFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  deleteFromFavorites(recipe) {
    this.favoriteRecipes.forEach((favRecipe) => {
      if (favRecipe.id === recipe.id) {
        this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1);
      }
    })
  }

  addToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
  }

  deleteFromCook(recipe) {
    this.recipesToCook.forEach((favRecipe) => {
      if (favRecipe.id === recipe.id) {
        this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1);
      }
    })
  }

  filterFavsByTag(searchTag) {
    const filteredTags = this.favoriteRecipes.filter((recipe) =>
      recipe.tags.includes(searchTag)
    );
    return filteredTags;
  }

  filterFavsByName(searchName) {
    const filteredNames = this.favoriteRecipes.filter((recipe) =>
      recipe.name.includes(searchName)
    );
    return filteredNames;
  }
}

export default User;
