import { expect } from "chai";
import Ingredient from "../src/classes/Ingredient";
import recipeData from "../src/data/recipes.js";
import ingredientsData from "../src/data/ingredients.js";

describe("Ingredient", () => {
  let ingredient;

  beforeEach(() => {
    ingredient = new Ingredient(recipeData[0].ingredients);
  });

  it("should be a function", () => {
    expect(Ingredient).to.be.a("function");
  });

  it("should be an instance of Ingredient", () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });
  it("should be able to contain all of the ingredients", () => {
    expect(ingredient.ingredientList.length).to.equal(11);
  });
  // it.skip("should be able to search by ingredient id". () => {
  //   expect(ingredient.searchById(20081)).to
  // });
});
