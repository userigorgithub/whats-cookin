import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/logo.png";
import "./images/search.png";
import Recipe from "../src/classes/Recipe";
import Ingredient from "../src/classes/Ingredient";
import RecipeRepository from "../src/classes/RecipeRepository";
import User from "../src/classes/User";
import recipeData from "../src/data/recipes.js";
import usersData from "../src/data/users.js";

const mainSection = document.querySelector(".main-section");
const recipeView = document.querySelector(".recipe-view");
const pageTitle = document.querySelector(".page-title-section");
const welcomeUser = document.querySelector(".user-welcome");

const forwardButton = document.getElementById("goForward");
const backwardButton = document.getElementById("goBackward");
const boxOfRecipes = document.querySelector(".box-of-recipes");
const recipeName = document.querySelector(".recipe-name");
const recipeImage = document.querySelector(".recipe-image");
const favoriteButton = document.getElementById("addFavorite");
const addToCookButton = document.getElementById("addToCook");

const homeButton = document.getElementById("homeButton");
const favoritesButton = document.getElementById("favoritesButton");
const wantToCookButton = document.getElementById("wantToCookButton");

const instructions = document.querySelector(".instructions");
const ingredients = document.querySelector(".ingredients");
const costRecipe = document.querySelector(".cost-recipe");

const searchBar = document.getElementById("search");

const sideDish = document.getElementById("sideDish");
const mainDish = document.getElementById("mainDish");
const dessert = document.getElementById("dessert");

const recipesMethods = new RecipeRepository(recipeData);
const allRecipes = recipesMethods.repositoryData;
//const or let displayedRecipes , each time we sort, displayed recipes will be currently displayed recipes, either faves array, all array, or wanna cook array, or tags array, or names array
//consider changing searchResults to displayedRecipes
//whatever we're about to display, feed in as param to displayAllRecipes

allRecipes.sort((a, b) => 0.5 - Math.random());

const randomUser = new User(
  usersData[Math.floor(Math.random() * usersData.length)]
);
console.log(randomUser);

const displayAllRecipes = (searchResults = allRecipes) => {
  boxOfRecipes.innerHTML = "";

  let showInDom = searchResults
    .filter((recipe, index) => index <= 2)
    .map(
      (recipe, mapIndex) =>
        (boxOfRecipes.innerHTML += `<section class="recipe-boxes" id="${recipe.id}">
      <h3 class="recipe-name">${recipe.name}</h3>
      <img class="recipe-image" id=${mapIndex} src="${recipe.image}" alt="recipe image" />
      <section class="recipe-actions">
        <button class="recipe-action-buttons" id="addToCook">
          To Cook
        </button>
        <button class="recipe-action-buttons" id="addFavorite">
          Favorite
        </button>
      </section>
    </section>`)
    );
};

const shiftForward = () => {
  allRecipes.push(allRecipes[0]);
  allRecipes.shift();
  displayAllRecipes();
};

const shiftBackward = () => {
  allRecipes.unshift(allRecipes[allRecipes.length - 1]);
  allRecipes.pop();
  displayAllRecipes();
};

const goHome = () => {
  hideElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  pageTitle.innerText = `Let's Find a Recipe!`;
};

const selectRecipe = (selectedIndex) => {
  const selectedRecipe = new Recipe(allRecipes[selectedIndex]);
  hideElement(mainSection);
  pageTitle.innerText = `Is this your next meal?`;
  showElement(recipeView);
  showElement(homeButton);

  recipeView.innerHTML = "";

  recipeView.innerHTML = `
  <section class="recipe-boxes" id="boxFour">
    <h3 class="recipe-name">${selectedRecipe.singleRecipe.name}</h3>
    <img class="recipe-image" src="${
      selectedRecipe.singleRecipe.image
    }" alt="recipe image" />
    <section class="recipe-actions">
      <button class="recipe-action-buttons" id="addToCook">
        Add to Cook
      </button>
      <button class="recipe-action-buttons" id="addFavorite">
        Favorite
      </button>
    </section>
    </section>

    <section class="recipe-details-section">
      <article class="instructions">Instructions:<br>${selectedRecipe.getInstructions()}</article>
      <article class="ingredients">Ingredients:<br>${selectedRecipe.storeIngredientNames()}</article>
      <section class="other-recipe-info">
        <article class="cost-recipe">Recipe Cost: ${selectedRecipe.calculateRecipeCost()}</article>
        <article class="other-cost">Other Cost</article>
        <article class="other-cost">Other Cost</article>
      </section>
    </section>
    `;
  // when clicking a recipe
  //how do we listen to the recipes? which of the three?

  //if image that was clicked on, includes this id in the same object, return entire object

  //we need to access the instructions and ingredients
  //make a new Recipe instance?

  // we need to know which box was clicked as well
  //we need to diplay the calculated cost
  //this is in
  //css with the bottom section as well
};
const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
};

const userSearch = (searchText) => {
  if (event.target.className.includes("search-input")) {
    var searchResults = recipesMethods
      .filterByTag(searchText)
      .concat(recipesMethods.filterByName(searchText));
  } else {
    mainSection.innerText =
      "Sorry, we couldn't find what you're looking for, please try again.";
  }
  displayAllRecipes(searchResults);
};

window.addEventListener("load", (e) => {
  welcomeUser.innerText = `Welcome back, ${randomUser.returnUserFirstName()}!`;
  displayAllRecipes();
});
forwardButton.addEventListener("click", (e) => shiftForward());
backwardButton.addEventListener("click", (e) => shiftBackward());
boxOfRecipes.addEventListener("click", (e) => {
  if (event.target.className === "recipe-image") {
    selectRecipe(event.target.id);
  }
});
homeButton.addEventListener("click", (e) => goHome());
searchBar.addEventListener("keyup", (e) => {
  userSearch(event.target.value);
});
