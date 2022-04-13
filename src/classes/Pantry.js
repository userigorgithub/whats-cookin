import Ingredient from "../classes/Ingredient";

class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }
  checkUserStock(recipe) {
    this.pantry;
    return true;
    //compare user's amounts of Ingredients to amounts of // ingredients in one specific recipe
    //compare whats in
    // recipe to whats in user's pantry
    //return true or false
    //does user have ingred at all?
    //do they have enough of each ingredient in array
    //true, return yay message
    //if anything false, returns message of what ingredients are still needed- need to iterate through whole array and check EACH item
    //double data set- user stock and recipe indredients ///names and amount... logical operator needed...
  }
  decrementStock(recipe) {
    //quantity.amount
    //when cook a meal(Cook now button) it means we already have enough ingredients to cook this meal.
    //so... checkUserStock method must be true for this method to work
    //link: between recipe and pantry... ID ?
    //for user: ingredient is ID number
    //recipe data is: ingredeients.id (IN ARRAY, filter? forEach, match to user data.pantry)
    //** POST also-  in API calls though**
  }

  incrementStock(ingredient) {
    //by ingredients
    //** POST also-  in API calls though**
  }
}

export default Pantry;
