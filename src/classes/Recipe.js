import Ingredient from '../classes/Ingredient';

class Recipe {
  constructor(singleRecipe) {
    this.singleRecipe = singleRecipe;
  }

  storeIngredientNames(ingredientsData) {
    const specificIngredient = new Ingredient(ingredientsData);

    const foodItemList = this.singleRecipe.ingredients.map((foodItem) =>
      specificIngredient.addNameOfIngredient(foodItem.id)
    );
    return foodItemList;
  }

  calculateRecipeCost(ingredientsData) {
    const specificIngredient = new Ingredient(ingredientsData);
    const totalPrice = this.singleRecipe.ingredients.reduce((acc, cur) => {
      acc +=
        cur.quantity.amount *
        specificIngredient.provideIngredientCostPerUnit(cur.id);
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
