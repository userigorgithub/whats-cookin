import "./styles.css";
import apiCalls from "./apiCalls";
import {
  fetchAll,
  apiUsersData,
  apiIngredientsData,
  apiRecipeData,
} from "./apiCalls.js";
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
import Pantry from "../src/classes/Pantry";

//----------Query Selectors----------//
const mainSection = document.querySelector(".main-section");
const recipeView = document.querySelector(".recipe-view");
const pageTitle = document.querySelector(".page-title-section");
const welcomeUser = document.querySelector(".user-welcome");
const forwardButton = document.getElementById("goForward");
const backwardButton = document.getElementById("goBackward");
const boxOfRecipes = document.querySelector(".box-of-recipes");
const favoriteButton = document.getElementById("addFavorite");
const addToCookButton = document.getElementById("addToCook");
const homeButton = document.getElementById("homeButton");
const favoritesButton = document.getElementById("favoritesButton");
const wantToCookButton = document.getElementById("wantToCookButton");
const instructions = document.querySelector(".instructions");
const ingredients = document.querySelector(".ingredients");
const costRecipe = document.querySelector(".cost-recipe");
const searchBar = document.getElementById("search");
const searchContainer = document.querySelector(".search-container");
const mains = document.getElementById("mains");
const snacks = document.getElementById("snacks");
const sides = document.getElementById("sides");
const bottomSection = document.querySelector(".bottom-section");

//---------Global Variables----------//
let recipeData,
  usersData,
  ingredientsData,
  currentRecipes,
  randomUser,
  allRecipes;

//----------Functions----------//
const loadPage = () => {
  fetchAll();
  Promise.all([apiUsersData, apiIngredientsData, apiRecipeData])
    .then((data) => setGlobalVariablesAndDisplay(data))
};

const setGlobalVariablesAndDisplay = (data) => {
  console.log("data", data);
  usersData = data[0];
  ingredientsData = data[1];
  recipeData = data[2];
  allRecipes = new RecipeRepository(recipeData);
  allRecipes.addDefaultPreferences();
  allRecipes.repositoryData.sort((a, b) => 0.5 - Math.random());
  currentRecipes = allRecipes;
  randomUser = new User(
    usersData[Math.floor(Math.random() * usersData.length)]
  );
  welcomeUser.innerText = `Welcome back, ${randomUser.returnUserFirstName()}!`;
  displayAllRecipes(allRecipes);
};
const displayAllRecipes = (currentRecipes = allRecipes) => {
  boxOfRecipes.innerHTML = "";
  let showInDom = currentRecipes.repositoryData
    .filter((recipe, index) => index <= 2)
    .map((recipe, mapIndex) => {
      let heart = "hidden";
      let love = "";
      let add = "";
      let minus = "hidden";
      if (recipe.addedToCook) {
        minus = "";
        add = "hidden";
      }
      if (recipe.favorited) {
        heart = "";
        love = "hidden";
      }
      boxOfRecipes.innerHTML += `<section class="recipe-boxes" id="${recipe.id}">
      <h3 class="recipe-name">${recipe.name}</h3>
      <section class="recipe-image-holder"></section>
        <img class="recipe-image" id=${mapIndex} src="${recipe.image}" alt="${recipe.name}" />
      <section class="recipe-actions">
        <img class="favorites-buttons ${love}" id=${mapIndex} src="./images/love.png" alt="love-icon"/>
        <img class="favorites-buttons ${heart}" id=${mapIndex} src="./images/heart.png" alt="heart-icon"/>
        <img class="to-cook-buttons ${add}" id=${mapIndex} src="./images/add.png" alt="plus-icon"/>
        <img class="to-cook-buttons ${minus}" id=${mapIndex} src="./images/minus.png" alt="minus-icon"/>
      </section>
    </section>`;
      return boxOfRecipes;
    });
};
const handleBoxOfRecipeEvents = () => {
  if (event.target.className === "recipe-image") {
    selectRecipe(event.target.id);
  }
  if (event.target.className.includes("to-cook-buttons")) {
    toggleToCook(allRecipes.repositoryData[event.target.id], event.target.id);
  }
  if (event.target.className.includes("favorites-buttons")) {
    toggleFavorites(
      allRecipes.repositoryData[event.target.id],
      event.target.id
    );
  }
};
const handleBoxOfSelectedRecipeEvents = () => {
  if (event.target.className.includes("to-cook-buttons")) {
    toggleToCook(allRecipes.repositoryData[event.target.id], event.target.id);
  }
  if (event.target.className.includes("favorites-buttons")) {
    toggleFavorites(
      allRecipes.repositoryData[event.target.id],
      event.target.id
    );
  }
  selectRecipe(event.target.id);
};
const searchItems = () => {
  if (favoritesButton.classList.contains("hidden")) {
    userSearchFavorites(event.target.value);
  } else if (homeButton.classList.contains("hidden")) {
    userSearchAllRecipes(event.target.value);
  }
};
const shiftForward = () => {
  currentRecipes.repositoryData.push(currentRecipes.repositoryData[0]);
  currentRecipes.repositoryData.shift();
  displayAllRecipes(currentRecipes);
};
const shiftBackward = () => {
  currentRecipes.repositoryData.unshift(
    currentRecipes.repositoryData[currentRecipes.repositoryData.length - 1]
  );
  currentRecipes.repositoryData.pop();
  displayAllRecipes(currentRecipes);
};
const goHome = () => {
  hideElement([homeButton, recipeView]);
  showElement([
    bottomSection,
    mainSection,
    favoritesButton,
    wantToCookButton,
    searchContainer,
  ]);
  pageTitle.innerText = "Let's Find a Recipe!";
  const restoreRecipes = new RecipeRepository(recipeData);
  allRecipes.repositoryData.map((recipe) => {
    currentRecipes.repositoryData.forEach((curRecipe) => {
      if (recipe.id === curRecipe.id) {
        recipe.addedToCook = curRecipe.addedToCook;
        recipe.favorited = curRecipe.favorited;
      }
    });
    return recipe;
  });
  allRecipes = restoreRecipes;
  currentRecipes = restoreRecipes;
  displayAllRecipes(restoreRecipes);
  searchBar.value = "";
};
const goToFavorites = () => {
  goHome();
  hideElement([recipeView, favoritesButton]);
  showElement([
    bottomSection,
    homeButton,
    mainSection,
    searchContainer,
    wantToCookButton,
  ]);
  searchBar.placeHolder = "Search Favorite Recipes";
  currentRecipes.repositoryData = allRecipes.repositoryData.filter(
    (recipe) => recipe.favorited
  );
  if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = "Your Favorite Recipes!";
  } else {
    pageTitle.innerText = "You Haven't Selected Any Favorites!";
  }
  displayAllRecipes(currentRecipes);
};
const goToWantToCook = () => {
  goHome();
  hideElement([recipeView, wantToCookButton, searchContainer]);
  showElement([bottomSection, homeButton, mainSection, favoritesButton]);
  currentRecipes.repositoryData = allRecipes.repositoryData.filter(
    (recipe) => recipe.addedToCook
  );
  if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = "Your Recipes To Cook!";
  } else {
    pageTitle.innerText = "You Don't Have Any Recipes To Cook!";
  }
  displayAllRecipes(currentRecipes);
};

const selectRecipe = (selectedIndex) => {
  const selectedRecipe = new Recipe(
    currentRecipes.repositoryData[selectedIndex]
  );
  hideElement([bottomSection, mainSection, searchContainer]);
  showElement([recipeView, homeButton]);
  pageTitle.innerText = "Is This Your Next Meal?";
  let heart = "hidden";
  let love = "";
  let add = "";
  let minus = "hidden";
  if (currentRecipes.repositoryData[selectedIndex].addedToCook) {
    minus = "";
    add = "hidden";
  }
  if (currentRecipes.repositoryData[selectedIndex].favorited) {
    heart = "";
    love = "hidden";
  }
  recipeView.innerHTML = "";
  recipeView.innerHTML += `
  <section class="recipe-boxes" id="boxFour">
    <h3 class="recipe-name">${selectedRecipe.singleRecipe.name}</h3>
    <img class="recipe-image" src="${
      selectedRecipe.singleRecipe.image
    }" alt="recipe image" />
    <section class="selected-recipe-actions">
      <img class="favorites-buttons ${love}" id=${selectedIndex} src="./images/love.png" alt="love-icon" />
      <img class="favorites-buttons ${heart}" id=${selectedIndex} src="./images/heart.png" alt="heart-icon" />
      <img class="to-cook-buttons ${add}" id=${selectedIndex} src="./images/add.png" alt="plus-icon" />
      <img class="to-cook-buttons ${minus}" id=${selectedIndex} src="./images/minus.png" alt="minus-icon" />
    </section>
    </section>
    <section class="recipe-details-section">
      <article class="instructions">Instructions:<br>${selectedRecipe.getInstructions()}</article>
      <article class="ingredients">Ingredients:<br>${selectedRecipe.storeIngredientNames(
        ingredientsData
      )}</article>
      <section class="other-recipe-info">
        <article class="cost-recipe">Recipe Cost: ${selectedRecipe.calculateRecipeCost(
          ingredientsData
        )}</article>
      </section>
    </section>`;
  var boxOfSelectedRecipe = document.querySelector(".selected-recipe-actions");
  boxOfSelectedRecipe.addEventListener("click", (e) => {
    handleBoxOfSelectedRecipeEvents(event.target.className);
  });
};

const showElement = (domItems) => {
  domItems.forEach((domItem) => {
    domItem.classList.remove("hidden");
  });
};

const hideElement = (domItems) => {
  domItems.forEach((domItem) => {
    domItem.classList.add("hidden");
  });
};

const userSearchFavorites = (searchText) => {
  if (event.target.className.includes("search-input")) {
    currentRecipes.repositoryData = randomUser
      .filterFavsByTag(searchText)
      .concat(randomUser.filterFavsByName(searchText));
  }
  showElement(homeButton);
  if (searchText === "") {
    pageTitle.innerText = "Let's Look at Your Favorites!";
  } else if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = `Here are your results for ${searchText} in your Favorites:`;
  } else {
    pageTitle.innerText =
      "Sorry, we couldn't find what you're looking for, please try again.";
  }
  displayAllRecipes(currentRecipes);
};
const userSearchAllRecipes = (searchText) => {
  allRecipes = new RecipeRepository(recipeData);
  allRecipes.addDefaultPreferences();
  currentRecipes.repositoryData = allRecipes
    .filterByTag(searchText)
    .concat(allRecipes.filterByName(searchText));
  if (searchText === "") {
    pageTitle.innerText = "Let's Find a Recipe!";
  } else if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = `Here are your results for ${searchText}:`;
  } else {
    pageTitle.innerText =
      "Sorry, we couldn't find what you're looking for, please try again.";
  }
  displayAllRecipes(currentRecipes);
};
const toggleToCook = (recipe, id) => {
  if (randomUser.recipesToCook.includes(recipe)) {
    randomUser.deleteFromCook(recipe);
    allRecipes.repositoryData[id].addedToCook = false;
  } else {
    randomUser.addToCook(recipe);
    allRecipes.repositoryData[id].addedToCook = true;
  }
  displayAllRecipes(currentRecipes);
};
const toggleFavorites = (recipe, id) => {
  if (randomUser.favoriteRecipes.includes(recipe)) {
    allRecipes.repositoryData[id].favorited = false;
    randomUser.deleteFromFavorites(recipe);
  } else {
    allRecipes.repositoryData[id].favorited = true;
    randomUser.addToFavorite(allRecipes.repositoryData[id]);
  }
  displayAllRecipes(currentRecipes);
};

//----------Event Listeners----------//
window.addEventListener("load", (e) => loadPage());
forwardButton.addEventListener("click", (e) => shiftForward());
backwardButton.addEventListener("click", (e) => shiftBackward());
boxOfRecipes.addEventListener("click", (e) =>
  handleBoxOfRecipeEvents(event.target.className)
);
homeButton.addEventListener("click", (e) => goHome());
favoritesButton.addEventListener("click", (e) => goToFavorites());
wantToCookButton.addEventListener("click", (e) => goToWantToCook());
searchBar.addEventListener("keyup", (e) => searchItems(event.target.value));
snacks.addEventListener("click", (e) => {
  (searchBar.value = "snack"), userSearchAllRecipes("snack");
});
mains.addEventListener("click", (e) => {
  (searchBar.value = "main dish"), userSearchAllRecipes("main dish");
});
sides.addEventListener("click", (e) => {
  (searchBar.value = "side dish"), userSearchAllRecipes("side dish");
});
