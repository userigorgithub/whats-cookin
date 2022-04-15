import Ingredient from "../classes/Ingredient";
// import ingredientsData from "../src/data/ingredients";

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
          // console.log('matched and sufficient amount for', pantryIngredient.ingredient)
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
      console.log("you have enough ingredients to cook");
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
          console.log("line 53", ingredientItemInRepository);
        }
        console.log("line 56", ingredient);
      });
      console.log("line 58", ingredient);
      return ingredient;
    });
  }

  changeStock(recipe, subtractStock = -1) {
    if (checkUserStock(recipe)) {
      recipe.singleRecipe.ingredients.forEach((recipeIngredient, index) => {
        this.pantry.forEach((pantryIngredient) => {
          if (recipeIngredient.id === pantryIngredient.ingredient) {
            postIngredients(
              pantryIngredient.ingredient,
              recipeIngredient.quantity.amount * subtract
            ); // send decreased amounts to server
            getIngredients(
              pantryIngredient.ingredient,
              recipeIngredient.quantity.amount
            ); //get decreased amounts from server and update user Pantry global variables
            console.log(
              `ran post function and changed server pantry with the following data,${
                pantryIngredient.ingredient
              } changed by ${recipeIngredient.quantity.amount * subtract}`
            );
          }
        });
      });
    } else {
      return "You don't have enough ingredients to cook this, how did you make it this far?";
    }
  }
}

export default Pantry;
