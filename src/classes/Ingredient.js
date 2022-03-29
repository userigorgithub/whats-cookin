import ingredientsData from "../data/ingredients.js";

class Ingredient {
  constructor(recipeIngredientList) {
    this.ingredientList = recipeIngredientList;
  }
  addNameOfIngredient(id) {
    const ingredientName = ingredientsData.filter(
      (ingredient) => ingredient.id === id
    );
    return ingredientName[0].name;
  }
}

export default Ingredient;
