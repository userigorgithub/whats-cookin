class RecipeRepository {
  constructor(repositoryData) {
    this.repositoryData = repositoryData;
  }

  filterByTag(searchTag) {
    const filteredTags = this.repositoryData.filter((recipe) =>
      recipe.tags.includes(searchTag)
    );
    return filteredTags;
  }

  filterByName(searchName) {
    const filteredNames = this.repositoryData.filter((recipe) =>
      recipe.name.includes(searchName)
    );
    return filteredNames;
  }

  addDefaultPreferences() {
    this.repositoryData.forEach((recipe) => {
      recipe.favorited = false;
      recipe.addedToCook = false;
    });
  }
}

export default RecipeRepository;
