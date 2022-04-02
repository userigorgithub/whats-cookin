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
  });

  it('should filter recipes by tag', () => {
    expect(recipeRepository.filterByTag('side dish').length).to.equal(22);
    expect(recipeRepository.filterByTag('main dish').length).to.equal(12);
  });

  it('should not filter recipes by incorrect tag', () => {
    expect(recipeRepository.filterByTag('MEAN DISH').length).to.equal(0);
  });

  it('should filter recipes by name', () => {
    expect(recipeRepository.filterByName('Loaded Chocolate Chip Pudding Cookie Cups')[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should not filter recipes by incorrect name', () => {
    expect(recipeRepository.filterByName('Chocolate Chip Cookie Cake')).to.deep.equal([]);
  });
});
