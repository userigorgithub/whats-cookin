import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
// import recipeData from '../src/data/recipes.js';
// import ingredientsData from '../src/data/ingredients.js';

describe("Recipe", () => {

  let recipeData, recipe, ingredientsData, ingredients;
  // let recipeInstructions = '';

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
      }
    ]

    ingredientsData = [
      {
        id: 1,
        name: "wheat flour",
        estimatedCostInCents: 142,
      },
      {
        id: 2,
        name: "bicarbonate of soda",
        estimatedCostInCents: 582,
      },
      {
        id: 3,
        name: "eggs",
        estimatedCostInCents: 472,
      }
    ]

    recipe = new Recipe(recipeData[0]);
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
  });

  it('should determine the names of ingredients needed in a recipe', () => {
    expect(recipe.storeIngredientNames(ingredients)).to.deep.equal(['wheat flour', 'bicarbonate of soda', 'eggs']);
    // expect(recipe.storeIngredientNames()[1]).to.deep.equal('bicarbonate of soda');
  });

  it('should calculate the cost of ingredients for a recipe', () => {
    expect(recipe.calculateRecipeCost(ingredients)).to.equal('$9.76 USD')
  });

  it('should return recipe\'s directions/instructions', () => {
    // recipe = new Recipe(recipeData[0]);
    expect(recipe.getInstructions()).to.equal('1. Cook something. \n')
    // recipe = new Recipe(recipeData[5]);
    // expect(recipe.getInstructions()).to.equal('1. To make the Cupcakes: Preheat oven to 350 degrees. Line 12 cupcake tins with paper holders. \n2. Whisk together dry Fruit Cocktail Cupcakes ingredients. \n3. Add in wet Fruit Cocktail Cupcakes ingredients and stir with a rubber spatula until thoroughly combined. Fill cupcake tins evenly, and bake for 20 minutes or until thin knife inserted in center comes out clean. \n');
  });
});
