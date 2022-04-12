import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

describe('Recipe', () => {
  let recipeData, recipe, recipeData2, recipe2, ingredientsData, ingredients;

  beforeEach(() => {

    recipeData = [
      {
        'id': 1,
        'image': 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
        'ingredients': [
          {
            'id': 1,
            'quantity': {
              'amount': 1.5,
              'unit': 'c',
            },
          },
          {
            'id': 2,
            'quantity': {
              'amount': 0.5,
              'unit': 'tsp',
            },
          },
          {
            'id': 3,
            'quantity': {
              'amount': 1,
              'unit': 'large',
            },
          },
        ],
        'instructions': [
          {
            'instruction': 'Cook something.',
            'number': 1,
          },
        ],
        'name': 'Loaded Chocolate Chip Pudding Cookie Cups',
        'tags': [
          'antipasti',
          'side dish',
          'snack',
          'appetizer',
          'antipasto',
          'hor d\'oeuvre',
        ],
      },
    ];

    recipeData2 = [
      {
        'id': 3,
        'image': 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
        'ingredients': [
          {
            'id': 2,
            'quantity': {
              'amount': 10,
              'unit': 'tsp'
            }
          },
          {
            'id': 3,
            'quantity': {
              'amount': 4,
              'unit': 'large'
            }
          }
        ],
        'instructions': [
          {
            'instruction': 'Mix and make things happen.',
            'number': 1
          }
        ],
        'name': 'Dirty Steve\'s Original Wing Sauce',
        'tags': ['sauce', 'snack']
      }
    ];

    ingredientsData = [
      {
        'id': 1,
        'name': 'wheat flour',
        'estimatedCostInCents': 142,
      },
      {
        'id': 2,
        'name': 'bicarbonate of soda',
        'estimatedCostInCents': 582,
      },
      {
        'id': 3,
        'name': 'eggs',
        'estimatedCostInCents': 472,
      },
    ];

    recipe = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData2[0]);
    ingredients = new Ingredient(ingredientsData);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should hold a single recipe', () => {
    expect(recipe.singleRecipe).to.deep.equal(recipeData[0]);
    expect(recipe2.singleRecipe).to.deep.equal(recipeData2[0]);
  });

  it('should determine the names of ingredients needed in a recipe', () => {
    expect(recipe.storeIngredientNames(ingredientsData)).to.deep.equal([
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
    ]);
    expect(recipe2.storeIngredientNames(ingredientsData)).to.deep.equal([
      'bicarbonate of soda',
      'eggs',
    ]);
  });

  it('should calculate the cost of ingredients for a recipe', () => {
    expect(recipe.calculateRecipeCost(ingredientsData)).to.equal('$9.76 USD');
    expect(recipe2.calculateRecipeCost(ingredientsData)).to.equal('$77.08 USD');
  });

  it('should return recipe\'s directions/instructions', () => {
    expect(recipe.getInstructions()).to.equal('1. Cook something. \n');
    expect(recipe2.getInstructions()).to.equal('1. Mix and make things happen. \n');
  });
});
