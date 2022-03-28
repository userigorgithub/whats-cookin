import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import recipeData from '../src/data/recipes.js';

describe('Recipe Repository', () => {

  let recipeRepository;

  beforeEach(() => {

    recipeRepository = new RecipeRepository(recipeData);
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceOf(RecipeRepository);
  });

  it('should have all recipe data', () => {
    expect(recipeRepository.repositoryData).to.equal(recipeData);
  })
});
