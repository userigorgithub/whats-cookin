import ingredientsData from "../data/ingredients.js";
import Ingredient from "../classes/Ingredient";

class Recipe {
  constructor(singleRecipe) {
    this.singleRecipe = singleRecipe;
    this.allIngredients = new Ingredient;
  }

  storeIngredientNames() {
    const foodItemList = this.singleRecipe.ingredients.map((foodItem) =>
      this.allIngredients.addNameOfIngredient(foodItem.id)
    );
    return foodItemList;
  }

}
export default Recipe;
