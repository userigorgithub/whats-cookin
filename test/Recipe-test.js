import { expect } from "chai";
import Recipe from "../src/classes/Recipe";
import recipeData from "../src/data/recipes.js";
import ingredientsData from "../src/data/ingredients.js";

describe("Recipe", () => {
  let recipe;

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
    //expect(recipe.storeIngredientNames()).to.deep.equal([]);
  });
  it.skip("should", () => {});
  it.skip("should", () => {});
});
