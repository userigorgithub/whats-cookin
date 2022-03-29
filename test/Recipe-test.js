import { expect } from "chai";
import Recipe from "../src/classes/Recipe";
import recipeData from "../src/data/recipes.js";
import ingredientsData from "../src/data/ingredients.js";

describe("Recipe", () => {
  let recipe;
  let recipeInstructions = ''

  beforeEach(() => {
    recipe = new Recipe(recipeData[0]);
  });

  it("should be a function", () => {
    expect(Recipe).to.be.a("function");
  });

  it("should be an instance of Recipe", () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it("should hold a single recipe", () => {
    expect(recipe.singleRecipe).to.deep.equal(recipeData[0]);
  });

  it("should determine the names of ingredients needed in a recipe", () => {
    expect(recipe.storeIngredientNames()[0]).to.deep.equal("wheat flour");
    expect(recipe.storeIngredientNames()[1]).to.deep.equal(
      "bicarbonate of soda"
    );
  });

  it("should calculate the cost of ingredients for a recipe", () => {
    expect(recipe.calculateRecipeCost()).to.equal('$177.76 USD')
  });

  it("should return it's directions/ instructions", () => {
    recipe = new Recipe(recipeData[11]);
    expect(recipe.getInstructions()).to.equal('1. Add all ingredients to a blender (except graham crackers if using). Cover and blend until well pureed then serve topped with crushed graham crackers if desired.*The banana is mostly what gives this smoothie it\'s sweetness, so I recommend using one that is speckled (not mushy though).Recipe Source: Cooking Classy \n')
    recipe = new Recipe(recipeData[5]);
    expect(recipe.getInstructions()).to.equal('1. To make the Cupcakes: Preheat oven to 350 degrees. Line 12 cupcake tins with paper holders. \n2. Whisk together dry Fruit Cocktail Cupcakes ingredients. \n3. Add in wet Fruit Cocktail Cupcakes ingredients and stir with a rubber spatula until thoroughly combined. Fill cupcake tins evenly, and bake for 20 minutes or until thin knife inserted in center comes out clean. \n')

  });
});
