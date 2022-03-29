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

  calculateRecipeCost() {
    const totalPrice = this.singleRecipe.ingredients.reduce((acc,cur) =>{

      acc += (cur.quantity.amount * this.allIngredients.provideIngredientCostPerUnit(cur.id))
      return acc
    },0)


    return `$${(totalPrice / 100).toFixed(2)} USD`
  }

}
export default Recipe;
