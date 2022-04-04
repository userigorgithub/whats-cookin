// import ingredientsData from '../data/ingredients.js';
import Ingredient from '../classes/Ingredient';

class Recipe {
  constructor(singleRecipe) {
    this.singleRecipe = singleRecipe;
    // this.allIngredients = new Ingredient();
  }

  storeIngredientNames(ingredientsData) {
    const foodItemList = this.singleRecipe.ingredients.map((foodItem) =>
      ingredientsData.addNameOfIngredient(foodItem.id)
    );
    return foodItemList;
  }

  calculateRecipeCost(ingredientsData) {
    const totalPrice = this.singleRecipe.ingredients.reduce((acc, cur) => {
      acc += (cur.quantity.amount * ingredientsData.provideIngredientCostPerUnit(cur.id))
      return acc;
    }, 0);
    return `$${(totalPrice / 100).toFixed(2)} USD`;
  }

  getInstructions() {
    const instructions = this.singleRecipe.instructions.reduce((acc, cur) => {
      acc += `${cur.number}. ${cur.instruction} \n`;
      return acc;
    }, '');
    return instructions;
  }
}

export default Recipe;
