import Ingredient from "../classes/Ingredient";
// import ingredientsData from "../src/data/ingredients";

class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }
  checkUserStock(recipe,ingredientsData) {

    let missingIngredients = recipe.singleRecipe.ingredients;

    recipe.singleRecipe.ingredients.forEach((recipeIngredient,index) => {
      this.pantry.forEach(pantryIngredient => {
          if((recipeIngredient.id === pantryIngredient.ingredient) && (pantryIngredient.amount >= recipeIngredient.quantity.amount)){
            console.log('matched and sufficient amount for', pantryIngredient.ingredient)
            missingIngredients[index].quantity.amount = 0;
          } else if((recipeIngredient.id === pantryIngredient.ingredient) && (pantryIngredient.amount < recipeIngredient.quantity.amount)) {
            missingIngredients[index].quantity.amount =  recipeIngredient.quantity.amount - pantryIngredient.amount
          };
      });
    });
    return this.finishStockCheck(missingIngredients,ingredientsData)
  }

finishStockCheck(missingIngredients, ingredientsData) {
  let missingIngredientsNames = this.determineNames(missingIngredients,ingredientsData);

  if(missingIngredientsNames.every(ingredient => !ingredient.quantity.amount)){
    console.log('you have enough ingredients to cook');
    return "You can cook this meal now!"
  } else {
    return `You are missing the Following Ingredients to cook a meal: ${missingIngredientsNames
      .filter(ingredient => ingredient.quantity.amount)
      .map(ingredient => `${ingredient.id} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}. `)
      .join("\n")}`;
  }
}


//data set of all ingredients
//missing Ingredients array
//map across the missing ingredients array
  //foreach of the ingredients data
  //if the Ids are the same then map the new name
    // { id: # to a name, quanitity: { amt: 3, units: 'c'}}
determineNames(missingIngredients, ingredientsData) {
  return missingIngredients.map(ingredient => {
    // ingredientsData.filter(ingredientItemInRepository =>{
      ingredientsData.forEach(ingredientItemInRepository => {
        if(ingredient.id === ingredientItemInRepository.id) {
         ingredient.id = ingredientItemInRepository.name
         console.log('line 53',ingredientItemInRepository)
        //  ingredient //{id: ingredientItemInRepository.name, quantity: { amount: ingredient.quantity.amount, unit: ingredient.quantity.unit }}
      }
      console.log('line 56',ingredient)
      })
      console.log('line 58',ingredient)
      return ingredient
  })
}

//if we have a recipe
//we need to access the array of ingredients
//we need to run a forEach Loop
//inside the forEach Loop we need to yse the Change Stock method for each ingredient


  changeStock(recipe, subtractStock = -1) {
    if(checkUserStock(recipe)){ //check user stock returns true if we have all the supplies
      recipe.singleRecipe.ingredients.forEach((recipeIngredient,index) => {
        this.pantry.forEach(pantryIngredient=>{
          if(recipeIngredient.id === pantryIngredient.ingredient){
            postIngredients(pantryIngredient.ingredient,(recipeIngredient.quantity.amount * subtract)) // send decreased amounts to server
            getIngredients(pantryIngredient.ingredient,recipeIngredient.quantity.amount) //get decreased amounts from server and update user Pantry global variables
            console.log(`ran post function and changed server pantry with the following data,${pantryIngredient.ingredient} changed by ${recipeIngredient.quantity.amount * subtract}`)
          };
        });
      });
    } else {
      return "You don't have enough ingredients to cook this, how did you make it this far?";
    };
  };
}

export default Pantry;
