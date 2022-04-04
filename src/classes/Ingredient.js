// import ingredientsData from '../data/ingredients.js';

class Ingredient {
  constructor(ingredientList) {
    this.ingredientList = ingredientList;
  }

  addNameOfIngredient(id) {
    const ingredientName = this.ingredientList.filter((ingredient) =>
      ingredient.id === id
    );
    return ingredientName[0].name;
  }

  provideIngredientCostPerUnit(id) {
    const ingredientName = this.ingredientList.filter((ingredient) =>
      ingredient.id === id
    );
    return ingredientName[0].estimatedCostInCents;
  }
}

export default Ingredient;
