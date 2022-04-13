import { expect } from "chai";
import User from "../src/classes/User";
import Recipe from "../src/classes/Recipe";
import Pantry from "../src/classes/Pantry";

describe("Pantry", () => {
  let recipeData, recipe, usersData, usersData2, pantry, pantry2, user, user2;

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
      //update a decremented stock pantry
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
    expect(pantry.checkUserStock(recipe)).to.equal(true);
  });


  it("should check whether a user's pantry has enough ingredients to cook a certain recipe", () => {
    console.log(pantry2.checkUserStock(recipe));
    expect(pantry2.checkUserStock(recipe)).to.equal(false);
  });

  //should let a user know what ingredient they still need to cook that specific recipe.

  // it("should be able to remove stock from a User's pantry after cooking the recipe", () => {
  //   expect(pantry.decrementStock(recipe)).to.equal.(>>>decrementedupdatedpantry)
  // })

  // it("should be able to add a single ingredient to a User's pantry", () => {
  //   expect(pantry.incrementStock(recipe)).to.equal.(>>>incrementedupdatedpantry)
  // })
});
