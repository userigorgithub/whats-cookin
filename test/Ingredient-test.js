import { expect } from "chai";
import Ingredient from "../src/classes/Ingredient";
import recipeData from "../src/data/recipes.js";
import ingredientsData from "../src/data/ingredients.js";

describe("Ingredient", () => {
  let ingredient;

  beforeEach(() => {
    ingredient = new Ingredient();
  });

  it("should be a function", () => {
    expect(Ingredient).to.be.a("function");
  });

  it("should be an instance of Ingredient", () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });
});
