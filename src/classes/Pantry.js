class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }
  checkUserStock(recipe, ingredientsData) {
    let missingIngredients = recipe.singleRecipe.ingredients;

    recipe.singleRecipe.ingredients.forEach((recipeIngredient, index) => {
      this.pantry.forEach((pantryIngredient) => {
        if (
          recipeIngredient.id === pantryIngredient.ingredient &&
          pantryIngredient.amount >= recipeIngredient.quantity.amount
        ) {
          missingIngredients[index].quantity.amount = 0;
        } else if (
          recipeIngredient.id === pantryIngredient.ingredient &&
          pantryIngredient.amount < recipeIngredient.quantity.amount
        ) {
          missingIngredients[index].quantity.amount =
            recipeIngredient.quantity.amount - pantryIngredient.amount;
        }
      });
    });
    return this.finishStockCheck(missingIngredients, ingredientsData);
  }

  finishStockCheck(missingIngredients, ingredientsData) {
    let missingIngredientsNames = this.determineNames(
      missingIngredients,
      ingredientsData
    );

    if (
      missingIngredientsNames.every((ingredient) => !ingredient.quantity.amount)
    ) {
      return "You can cook this meal now!";
    } else {
      return `You are missing the Following Ingredients to cook a meal: ${missingIngredientsNames
        .filter((ingredient) => ingredient.quantity.amount)
        .map(
          (ingredient) =>
            `${ingredient.id} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}. `
        )
        .join("\n")}`;
    }
  }

  determineNames(missingIngredients, ingredientsData) {
    return missingIngredients.map((ingredient) => {
      ingredientsData.forEach((ingredientItemInRepository) => {
        if (ingredient.id === ingredientItemInRepository.id) {
          ingredient.id = ingredientItemInRepository.name;
        }
      });
      return ingredient;
    });
  }

}

export default Pantry;
