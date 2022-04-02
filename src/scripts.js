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
const recipeBoxes = document.querySelector("recipe-boxes");
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

const allRecipes = new RecipeRepository(recipeData);
allRecipes.repositoryData.sort((a, b) => 0.5 - Math.random());

let currentRecipes  = allRecipes.repositoryData;

const randomUser = new User(
  usersData[Math.floor(Math.random() * usersData.length)]
);
console.log(randomUser);

const displayAllRecipes = (currentRecipes = allRecipes.repositoryData) => {
  boxOfRecipes.innerHTML = "";

  let showInDom = currentRecipes
    .filter((recipe, index) => index <= 2)
    .map(
      (recipe, mapIndex) =>
        (boxOfRecipes.innerHTML += `<section class="recipe-boxes" id="${recipe.id}">
      <h3 class="recipe-name">${recipe.name}</h3>
      <img class="recipe-image" id=${mapIndex} src="${recipe.image}" alt="recipe image" />
      <section class="recipe-actions">
        <button class="to-cook-buttons" id=${mapIndex}>
          To Cook
        </button>
        <button class="favorites-buttons" id=${mapIndex}>
          Favorite
        </button>
      </section>
    </section>`)
    );
};

const shiftForward = () => {
  console.log(currentRecipes);
  currentRecipes.push(currentRecipes[0]);
  currentRecipes.shift();
  displayAllRecipes(currentRecipes);
};

const shiftBackward = () => {
  currentRecipes.unshift(currentRecipes[currentRecipes.length - 1]);
  currentRecipes.pop();
  displayAllRecipes(currentRecipes);
};

const goHome = () => {
  hideElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  pageTitle.innerText = `Let's Find a Recipe!`;
};

const selectRecipe = (selectedIndex) => {
  console.log('target index',selectedIndex)
  const selectedRecipe = new Recipe(currentRecipes[selectedIndex]);
  console.log('recipe:',selectedRecipe)
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
      <button class="to-cook-buttons" id=${selectedIndex}>
        Add to Cook
      </button>
      <button class="favorites-buttons" id=${selectedIndex}>
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
};
const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
};

const userSearch = (searchText) => {
  if (event.target.className.includes("search-input")) {
    currentRecipes = allRecipes
      .filterByTag(searchText)
      .concat(allRecipes.filterByName(searchText));
  } else {
    mainSection.innerText =
      "Sorry, we couldn't find what you're looking for, please try again.";
  }
  displayAllRecipes(currentRecipes);
};

window.addEventListener("load", (e) => {
  welcomeUser.innerText = `Welcome back, ${randomUser.returnUserFirstName()}!`;
  displayAllRecipes();
});
forwardButton.addEventListener("click", (e) => shiftForward());
backwardButton.addEventListener("click", (e) => shiftBackward());
boxOfRecipes.addEventListener("click", (e) => {
  console.log("recipe boxes target", event.target);
  if (event.target.className === "recipe-image") {
    selectRecipe(event.target.id);
  }
  if (event.target.className === "to-cook-buttons") {
    toggleToCook(allRecipes.repositoryData[event.target.id]);

    // //CONDIOTIONAL if includes, do delete, if not , add to cook ?????
    // randomUser.deleteFromCook(allRecipes[event.target.id]);
    // //if its able to delete it, break the loop?
    // randomUser.addToCook(allRecipes[event.target.id]);
    // console.log(randomUser);
    // console.log("Cond to cook is working");
    // console.log(event.target.id);
  }
  if (event.target.className === "favorites-buttons") {
    // randomUser.addToFavorite(allRecipes[event.target.id]);
    toggleFavorites(allRecipes.repositoryData[event.target.id]);
    console.log("fave user", randomUser);
    console.log("2nd faves Cond is working");
  }
});

const toggleToCook = (recipe) => {
  console.log(randomUser.recipesToCook.includes(recipe));
  if (randomUser.recipesToCook.includes(recipe)) {
    randomUser.deleteFromCook(recipe);
  } else {
    randomUser.addToCook(recipe);
  }
  console.log("cook user", randomUser);
};

const toggleFavorites = (recipe) => {
  console.log(randomUser.favoriteRecipes.includes(recipe));
  if (randomUser.favoriteRecipes.includes(recipe)) {
    randomUser.deleteFromFavorites(recipe);
  } else {
    randomUser.addToFavorite(recipe);
  }
  console.log("cook user", randomUser);
};

homeButton.addEventListener("click", (e) => goHome());
searchBar.addEventListener("keyup", (e) => {
  userSearch(event.target.value);
});
