import { expect } from "chai";
import Recipe from "../src/classes/Recipe";
import recipeData from "../src/data/recipes.js";

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
  it.skip("should", () => {});
  it.skip("should", () => {});
  it.skip("should", () => {});
});
