import { expect } from "chai";
import User from "../src/classes/User";
import Recipe from "../src/classes/Recipe";
import Pantry from "../src/classes/Pantry";

describe("Pantry", () => {
  let recipeData,
    recipe,
    usersData,
    usersData2,
    pantry,
    pantry2,
    user,
    user2,
    missingIngredients,
    missingIngredients2,
    missingIngredientsNames,
    ingredientsData;

  beforeEach(() => {
    usersData = [
      {
        name: "Saige O'Kon",
        id: 1,
        pantry: [
          {
            ingredient: 1,
            amount: 2,
          },
          {
            ingredient: 2,
            amount: 10,
          },
          {
            ingredient: 3,
            amount: 5,
          },
        ],
      },
    ];

    usersData2 = [
      {
        name: "Ephraim Goyette",
        id: 2,
        pantry: [
          {
            ingredient: 2,
            amount: 3,
          },
          {
            ingredient: 3,
            amount: 7,
          },
        ],
      },
    ];

    recipeData = [
      {
        id: 1,
        image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        ingredients: [
          {
            id: 1,
            quantity: {
              amount: 1.5,
              unit: "c",
            },
          },
          {
            id: 2,
            quantity: {
              amount: 0.5,
              unit: "tsp",
            },
          },
          {
            id: 3,
            quantity: {
              amount: 1,
              unit: "large",
            },
          },
        ],
        instructions: [
          {
            instruction: "Cook something.",
            number: 1,
          },
        ],
        name: "Loaded Chocolate Chip Pudding Cookie Cups",
        tags: [
          "antipasti",
          "side dish",
          "snack",
          "appetizer",
          "antipasto",
          "hor d'oeuvre",
        ],
      },
    ];

    missingIngredients = [
      { id: 1, quantity: { amount: 0, unit: "c" } },
      { id: 2, quantity: { amount: 0, unit: "tsp" } },
      { id: 3, quantity: { amount: 0, unit: "large" } },
    ];

    missingIngredients2 = [
      { id: 1, quantity: { amount: 1.5, unit: "c" } },
      { id: 2, quantity: { amount: 0, unit: "tsp" } },
      { id: 3, quantity: { amount: 0, unit: "large" } },
    ];

    missingIngredientsNames = [
      { id: 1, name:"wheat flour", quantity: { amount: 0, unit: "c" } },
      { id: 2, name:"bicarbonate of soda", quantity: { amount: 0, unit: "tsp" } },
      { id: 3, name: "eggs", quantity: { amount: 0, unit: "large" } },
    ];

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
      },
    ];

    user = new User(usersData[0]);
    user2 = new User(usersData2[0]);
    recipe = new Recipe(recipeData[0]);
    pantry = new Pantry(user.singleUser.pantry);
    pantry2 = new Pantry(user2.singleUser.pantry);
  });

  it("should be a function", () => {
    expect(Pantry).to.be.a("function");
  });

  it("should be an instance of Pantry", () => {
    expect(pantry).to.be.an.instanceOf(Pantry);
  });

  it("should be able to store a user's ingredients", () => {
    expect(pantry.pantry).to.deep.equal(user.singleUser.pantry);
    expect(pantry2.pantry).to.deep.equal(user2.singleUser.pantry);
  });

  it("should check whether a user's pantry has enough ingredients to cook a certain recipe", () => {
    expect(pantry.checkUserStock(recipe, ingredientsData)).to.equal(
      "You can cook this meal now!"
    );
  });

  it("should check whether a user's pantry does not have ingredients to cook a certain recipe and tell them what is missing", () => {
    expect(pantry2.checkUserStock(recipe, ingredientsData)).to.equal(
      "You are missing the Following Ingredients to cook a meal: wheat flour - 1.5 c. "
    );
  });

  it("should be able to cook a recipe if the user has the required ingredients", () => {
    expect(
      pantry.finishStockCheck(missingIngredients, ingredientsData)
    ).to.equal("You can cook this meal now!");
  });

  it("should not be able to cook a meal if the user does not have the proper ingredients", () => {
    expect(
      pantry2.finishStockCheck(missingIngredients2, ingredientsData)
    ).to.equal(
      "You are missing the Following Ingredients to cook a meal: wheat flour - 1.5 c. "
    );
  });

  it("should be able to determine names of the ingredients by ID", () => {
    expect(
      pantry.determineNames(missingIngredients, ingredientsData)
    ).to.deep.equal(missingIngredientsNames);
  });
});
