import ingredientsData from "../data/ingredients.js";
import Ingredient from "../classes/Ingredient";

class Recipe {
  constructor(singleRecipe) {
    this.singleRecipe = singleRecipe;
  }

  storeIngredientNames() {
    const foodItemList = this.singleRecipe.ingredients.map((foodItem) =>
      this.addNameOfIngredient(foodItem.id)
    );
    return foodItemList;
  }
  addNameOfIngredient(id) {
    const ingredientName = ingredientsData.filter(
      (ingredient) => ingredient.id === id
    );
    return ingredientName[0].name;
  }
}
export default Recipe;
