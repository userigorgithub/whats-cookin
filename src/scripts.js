import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/logo.png";
import "./images/search.png";
import "./images/add.png";
import "./images/minus.png";
import "./images/love.png";
import "./images/heart.png";
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

let currentRecipes = allRecipes.repositoryData;

const randomUser = new User(
  usersData[Math.floor(Math.random() * usersData.length)]
);

const displayAllRecipes = (currentRecipes = allRecipes.repositoryData) => {
  boxOfRecipes.innerHTML = "";

  let showInDom = currentRecipes
    .filter((recipe, index) => index <= 2)
    .map(
      (recipe, mapIndex) =>
        (boxOfRecipes.innerHTML += `<section class="recipe-boxes" id="${recipe.id}">
      <h3 class="recipe-name">${recipe.name}</h3>
      <section class="recipe-image-holder"></section>
        <img class="recipe-image" id=${mapIndex} src="${recipe.image}" alt="recipe image" />
      <section class="recipe-actions">
        <img class="favorites-buttons" id=${mapIndex} src="./images/love.png" alt="love-icon"/>
        <img class="to-cook-buttons" id=${mapIndex} src="./images/add.png" alt="plus-icon"/>

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
  currentRecipes = allRecipes.repositoryData;
  hideElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  pageTitle.innerText = `Let's Find a Recipe!`;
  displayAllRecipes(currentRecipes);
  searchBar.value = "";
};

const goToFavorites = () => {
  showElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  searchBar.placeHolder = "Search Favorite Recipes";
  currentRecipes = randomUser.favoriteRecipes;
  if (currentRecipes.length) {
    pageTitle.innerText = `Your Favorite Recipes!`;
  } else {
    pageTitle.innerText = `You Haven't Selected Any Favorites!`;
  }
  displayAllRecipes(currentRecipes);
};

const goToWantToCook = () => {
  showElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  // searchBar.value = 'Search Recipes To Cook';
  // pageTitle.innerText = `Your Recipes To Cook!`;
  currentRecipes = randomUser.recipesToCook;
  if (currentRecipes.length) {
    pageTitle.innerText = `Your Recipes To Cook!`;
  } else {
    pageTitle.innerText = `You Don't Have Any Recipes To Cook!`;
  }
  displayAllRecipes(currentRecipes);
};

const selectRecipe = (selectedIndex) => {
  const selectedRecipe = new Recipe(currentRecipes[selectedIndex]);

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

// const userSearchWantToCook = (searchText) => {
//   if (event.target.className.includes("search-input")) {
//     currentRecipes = allRecipes
//       .filterByTag(searchText)
//       .concat(allRecipes.filterByName(searchText));
//   }
// }

const userSearchFavorites = (searchText) => {
  if (event.target.className.includes("search-input")) {
    currentRecipes = randomUser
      .filterFavsByTag(searchText)
      .concat(randomUser.filterFavsByName(searchText));
  }
  if (searchText === "") {
    pageTitle.innerText = `Let's Look at Your Favorites 222!`;
  } else if (currentRecipes.length) {
    pageTitle.innerText = `Here are your results for ${searchText} in your Favorites`;
  } else {
    pageTitle.innerText =
      "Sorry, we couldn't find what you're looking for, please try again.";
  }
  displayAllRecipes(currentRecipes);
};

const userSearchAllRecipes = (searchText) => {
  if (event.target.className.includes("search-input")) {
    currentRecipes = allRecipes
      .filterByTag(searchText)
      .concat(allRecipes.filterByName(searchText));
  }

  if (searchText === "") {
    pageTitle.innerText = `Let's find a recipe 222!`;
  } else if (currentRecipes.length) {
    pageTitle.innerText = `Here are your results for ${searchText}`;
  } else {
    pageTitle.innerText =
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
  if (event.target.className === "recipe-image") {
    selectRecipe(event.target.id);
  }
  if (event.target.className === "to-cook-buttons") {
    toggleToCook(allRecipes.repositoryData[event.target.id]);
  }
  if (event.target.className === "favorites-buttons") {
    toggleFavorites(allRecipes.repositoryData[event.target.id]);
  }
});

const toggleToCook = (recipe) => {
  if (randomUser.recipesToCook.includes(recipe)) {
    randomUser.deleteFromCook(recipe);
  } else {
    randomUser.addToCook(recipe);
  }
};

const toggleFavorites = (recipe) => {
  if (randomUser.favoriteRecipes.includes(recipe)) {
    randomUser.deleteFromFavorites(recipe);
  } else {
    randomUser.addToFavorite(recipe);
  }
};

homeButton.addEventListener("click", (e) => goHome());
favoritesButton.addEventListener("click", (e) => goToFavorites());
wantToCookButton.addEventListener("click", (e) => goToWantToCook());
searchBar.addEventListener("keyup", (e) => {
  //conditional to use the correct search function
  if (homeButton.classList.contains("hidden")) {
    userSearchAllRecipes(event.target.value);
  } else {
    userSearchFavorites(event.target.value);
  }
});
//if home button classListcontains is hidden then searchAllRecipes
