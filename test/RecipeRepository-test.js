import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('Recipe Repository', () => {

  let recipeRepository;

  beforeEach(() => {

    recipeRepository = new RecipeRepository();
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceOf(RecipeRepository);
  });
});
