import Ingredient from "../classes/Ingredient";

class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }
  checkUserStock(recipe) {
    // this.pantry;
    // return true;
    //compare user's amounts of Ingredients to amounts of // ingredients in one specific recipe
    //compare whats in
    // recipe to whats in user's pantry
    //return true or false
    //does user have ingred at all?


    //map recipe ids
    //map pantry ids
    //use every to see if all recipe Ids are included in the pantry
      // pantryIds.includes(recipe.id)
      //if true then the pantry does ahave ingredients but amounts not verified

      //if false we need to find out what is missing
          //filter recipe ids !pantry.includes(recipeId)
          //we need all of those ingredients
          //what do we need some of?


    //if pantry ids include recipe ids then great.
    //forEach MappedPantry.includes(recipeId)
    //then you have the ingredients but know nothing about amounts...

    //use every to see if all ingredients are there and in good quantities?

    //if i return the recipe and just update the amounts, the amounts I don't touch are the ones that aren't present at all....
    let missingIngredients = recipe.singleRecipe.ingredients; //array of objects of ingredients

    recipe.singleRecipe.ingredients.forEach((recipeIngredient,index) => {
      this.pantry.forEach(pantryIngredient=>{
        // console.log(pantryIngredient)
          if((recipeIngredient.id === pantryIngredient.ingredient) && (pantryIngredient.amount >= recipeIngredient.quantity.amount)){
            // you have enough of THIS ingredient
            //you aren't missing any ingredients, set missing ingredients to 0

            console.log('matched and sufficient amount for', pantryIngredient.ingredient)
            missingIngredients[index].quantity.amount =  0;

          } else if((recipeIngredient.id === pantryIngredient.ingredient) && (pantryIngredient.amount < recipeIngredient.quantity.amount)) {
            missingIngredients[index].quantity.amount =  recipeIngredient.quantity.amount - pantryIngredient.amount
            //set a key of the missing item and have the missing amount
          }
      })


    })

console.log(missingIngredients)

    if(missingIngredients.every(ingredient => !ingredient.quantity.amount)){
      return true
      //this means we are missing nothing.....
    } else {

      return `You are missing the Following Ingredients to cook a meal: ${missingIngredients
        .filter(ingredient => ingredient.quantity.amount)
        .map(ingredient => `${ingredient.id} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}. `)
        .join("\n")
      }`;
    }


    //do they have enough of each ingredient in array
    //true, return yay message
    //if anything false, returns message of what ingredients are still needed- need to iterate through whole array and check EACH item
    //double data set- user stock and recipe indredients ///names and amount... logical operator needed...
  }
  changeStock(recipe, subtractStock = -1) {
      //subtractStock defaults to -1
      //if we feed the parameter of 1 then it adds stock of the entire recipe.



    //quantity.amount
    //when cook a meal(Cook now button) it means we already have enough ingredients to cook this meal.
    //so... checkUserStock method must be true for this method to work
    //link: between recipe and pantry... ID ?
    //for user: ingredient is ID number
    //recipe data is: ingredeients.id (IN ARRAY, filter? forEach, match to user data.pantry)
    //** POST also-  in API calls though**

    //if we are cooking we know we have ingredients and enough supply... right

    if(checkUserStock(recipe)){ //check user stock returns true if we have all the supplies
      recipe.singleRecipe.ingredients.forEach((recipeIngredient,index) => {
        this.pantry.forEach(pantryIngredient=>{
          // console.log(pantryIngredient)
          if(recipeIngredient.id === pantryIngredient.ingredient){
            postFunction(pantryIngredient.ingredient,(recipeIngredient.quantity.amount * subtract)) // send decreased amounts to server
            getFunction(pantryIngredient.ingredient,recipeIngredient.quantity.amount) //get decreased amounts from server and update user Pantry global variables
            console.log(`ran post function and changed server pantry with the following data,${pantryIngredient.ingredient} changed by ${recipeIngredient.quantity.amount * subtract}`)
          };
        });
      });
    } else {
      return "You don't have enough ingredients to cook this, how did you make it this far?";
    };
  };


  // incrementStock(ingredient) {
  //   //by ingredients
  //   //** POST also-  in API calls though**
  //
  //   recipe.singleRecipe.ingredients.forEach((recipeIngredient,index) => {
  //     this.pantry.forEach(pantryIngredient=>{
  //       // console.log(pantryIngredient)
  //       if(recipeIngredient.id === pantryIngredient.ingredient){
  //         postFunction(pantryIngredient.ingredient,recipeIngredient.quantity.amount) // send increased amounts to server
  //         getFunction(pantryIngredient.ingredient,recipeIngredient.quantity.amount) //get increased amounts from server and update user Pantry global variables
  //         console.log(`ran post function and decreased server pantry with the following data,${pantryIngredient.ingredient},${recipeIngredient.quantity.amount}`)
  //       };
  //     });
  //   });

  }
}

export default Pantry;
