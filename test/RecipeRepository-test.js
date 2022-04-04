import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('Recipe Repository', () => {

  let recipeData, recipeRepository;

  beforeEach(() => {

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
          },
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
    expect(recipeRepository.filterByTag('side dish').length).to.equal(1);
    expect(recipeRepository.filterByTag('main dish').length).to.equal(0);
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

  it('should be able to have default values of false', () => {
    recipeRepository.addDefaultPreferences();
    expect(recipeRepository.repositoryData[0].favorited).to.equal(false);
    expect(recipeRepository.repositoryData[0].addedToCook).to.equal(false);
  });
});
