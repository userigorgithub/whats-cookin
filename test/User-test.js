import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';

describe('User', () => {

  let usersData, user, recipeData, recipe;

  beforeEach(() => {

    usersData = [
      {
        "name": "Saige O'Kon",
        "id": 1,
        "pantry": [
          {
            "ingredient": 1,
            "amount": 1
          },
          {
            "ingredient": 2,
            "amount": 10
          },
          {
            "ingredient": 3,
            "amount": 5
          }
        ]
      }
    ]

    recipeData = [
      {
        "id": 1,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [
          {
            "id": 1,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          },
          {
            "id": 2,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "id": 3,
            "quantity": {
              "amount": 1,
              "unit": "large"
            },
          }
        ],
        "instructions": [
          {
            "instruction": "Cook something.",
            "number": 1
          },
        ],
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "tags": ["antipasti", "side dish", "snack", "appetizer", "antipasto", "hor d'oeuvre"]
      },
    ]

    user = new User(usersData[0]);
    recipe = new Recipe(recipeData[0]);

    user.addToFavorite(recipe.singleRecipe);
    user.addToCook(recipe.singleRecipe);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should hold a single user', () => {
    expect(user.singleUser).to.equal(usersData[0]);
  });

  it('should have a name', () => {
	   expect(user.singleUser.name).to.equal('Saige O\'Kon');
  });

  it('should have an id', () => {
	   expect(user.singleUser.id).to.equal(1);
  });

  it('should have a pantry', () => {
	   expect(user.singleUser.pantry).to.equal(usersData[0].pantry);
  });

  it('should be able to split user\'s name', () => {
	   expect(user.returnUserFirstName()).to.equal('Saige');
  });

  it('should be able to favorite a recipe', () => {
	  expect(user.favoriteRecipes[0]).to.equal(recipeData[0]);
  });

  it('should not be able to have duplicate recipe in favorites', () => {
    user.addToFavorite(recipe.singleRecipe);
	  expect(user.favoriteRecipes.length).to.equal(1);
  });

  it('should be able to delete favorite recipe', () => {
    user.deleteFromFavorites(recipeData[0].id);
	  expect(user.favoriteRecipes.includes(recipeData[0])).to.equal(true);
  });

  it('should not be able to delete recipe that is not in an array in favorites', () => {
    user.deleteFromFavorites(45454545);
	  expect(user.favoriteRecipes[0]).to.deep.equal(recipeData[0]);
  });

  it('should be able to add to want-to-cook a recipe', () => {
	  expect(user.recipesToCook[0]).to.equal(recipeData[0]);
  });

  it('should not be able to add duplicate recipe in want-to-cook', () => {
    user.addToCook(recipe.singleRecipe);
    expect(user.recipesToCook.length).to.equal(1);
  });

  it('should be able to delete want-to-cook recipe', () => {
    user.deleteFromCook(recipeData[0].id);
	  expect(user.recipesToCook.includes(recipeData[0])).to.equal(true);
  });

  it('should not be able to delete recipe that is not in an array in want-to-cook', () => {
    user.deleteFromCook(45454545);
	  expect(user.recipesToCook[0]).to.deep.equal(recipeData[0]);
  });

  it('should filter recipes in favorites by tag', () => {
    user.addToFavorite(recipe.singleRecipe);
    expect(user.filterFavsByTag('snack').length).to.equal(1);
  });

  it('should not filter recipes in favorites by incorrect tag', () => {
    user.addToFavorite(recipe.singleRecipe);
    expect(user.filterFavsByTag('SLACK').length).to.equal(0);
  });

  it('should filter recipes in favorites by name', () => {
    user.addToFavorite(recipe.singleRecipe);
    expect(user.filterFavsByName('Loaded Chocolate Chip Pudding Cookie Cups')[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should not filter recipes in favorites by incorrect name', () => {
    user.addToFavorite(recipe.singleRecipe);
    expect(user.filterFavsByName('Loaded Pudding Cookie Cups')).to.deep.equal([]);
  });
});
