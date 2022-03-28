class RecipeRepository {
  constructor(repositoryData) {
    this.repositoryData = repositoryData;
    // One class to get you started!
  }

  filterByTag(searchTag) {
    const filteredTags = this.repositoryData.filter(recipe => recipe.tags.includes(searchTag));
    return filteredTags;
  }

  
}

export default RecipeRepository;
