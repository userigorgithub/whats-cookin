import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users.js';
import recipeData from '../src/data/recipes.js';

describe('User', () => {

  let user, recipe;

  beforeEach(() => {

    user = new User(usersData[0]);
    recipe = new Recipe(recipeData[0]);
    user.addToFavorite(recipe.singleRecipe);
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

  it('should not be able to have duplicate recipe', () => {
    user.addToFavorite(recipe.singleRecipe);
	  expect(user.favoriteRecipes.length).to.equal(1);
  });

  it('should be able to delete favorite recipe', () => {
    user.deleteFromFavorites(recipeData[0].id);
	  expect(user.favoriteRecipes.includes(recipeData[0])).to.equal(false);
  });

  it('should not be able to delete recipe that is not in an array', () => {
    user.deleteFromFavorites(45454545);
	  expect(user.favoriteRecipes[0]).to.deep.equal(recipeData[0]);
  });

});
