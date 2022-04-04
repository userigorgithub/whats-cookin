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
  console.log("scripts JS loadFetch is working");
  fetchAll();
  Promise.all([apiUsersData, apiIngredientsData, apiRecipeData]).then((data) =>
    setGlobalVariablesAndDisplay(data)
  );
};

const setGlobalVariablesAndDisplay = (data) => {
  usersData = data[0].usersData;
  ingredientsData = data[1].ingredientsData;
  recipeData = data[2].recipeData;

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
      console.log("ids of mapped recipes that are showing on DOM", recipe.id);
      if (recipe.addedToCook) {
        minus = "";
        add = "hidden";
      }
      if (recipe.favorited) {
        heart = "";
        love = "hidden";
        // console.log(allRecipes.repositoryData[mapIndex]);
      }
      boxOfRecipes.innerHTML += `<section class="recipe-boxes" id="${recipe.id}">
      <h3 class="recipe-name">${recipe.name}</h3>
      <section class="recipe-image-holder"></section>
        <img class="recipe-image" id=${mapIndex} src="${recipe.image}" alt="recipe image" />
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
    console.log("YaY condtional working");
    toggleToCook(allRecipes.repositoryData[event.target.id], event.target.id);
  }
  if (event.target.className.includes("favorites-buttons")) {
    toggleFavorites(
      allRecipes.repositoryData[event.target.id],
      event.target.id
    );
  }
};

const searchItems = () => {
  if (homeButton.classList.contains("hidden")) {
    userSearchAllRecipes(event.target.value);
  } else {
    userSearchFavorites(event.target.value);
  }
};
const shiftForward = () => {
  console.log(currentRecipes.repositoryData);
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
  console.log("going home should have all 50 recipes", allRecipes);
  console.log("going home current recipes", currentRecipes);

  hideElement(homeButton);
  showElement(bottomSection);
  hideElement(recipeView);
  showElement(mainSection);
  showElement(favoritesButton);
  showElement(wantToCookButton);
  showElement(searchContainer);
  pageTitle.innerText = `Let's Find a Recipe!`;

  const restoreRecipes = new RecipeRepository(recipeData);
  // allRecipes.addDefaultPreferences();
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
  console.log("allrecipes all 50 recipes", allRecipes);
  console.log("going current recipes", currentRecipes);
  console.log("restoreRecipes", restoreRecipes);
  displayAllRecipes(restoreRecipes);
  searchBar.value = "";
};

const goToFavorites = () => {
  showElement(bottomSection);
  showElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  hideElement(favoritesButton);
  showElement(searchContainer);
  showElement(wantToCookButton);
  searchBar.placeHolder = "Search Favorite Recipes";

  currentRecipes.repositoryData = allRecipes.repositoryData.filter(
    (recipe) => recipe.favorited
  );

  if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = `Your Favorite Recipes!`;
  } else {
    pageTitle.innerText = `You Haven't Selected Any Favorites!`;
  }

  displayAllRecipes(currentRecipes);
};

const goToWantToCook = () => {
  showElement(bottomSection);
  showElement(homeButton);
  hideElement(recipeView);
  showElement(mainSection);
  hideElement(wantToCookButton);
  hideElement(searchContainer);
  showElement(favoritesButton);

  currentRecipes.repositoryData = allRecipes.repositoryData.filter(
    (recipe) => recipe.addedToCook
  );

  if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = `Your Recipes To Cook!`;
  } else {
    pageTitle.innerText = `You Don't Have Any Recipes To Cook!`;
  }
  displayAllRecipes(currentRecipes);
};

const selectRecipe = (selectedIndex) => {
  const selectedRecipe = new Recipe(
    currentRecipes.repositoryData[selectedIndex]
  );
  hideElement(bottomSection);
  hideElement(mainSection);
  hideElement(searchContainer);
  pageTitle.innerText = `Is This Your Next Meal?`;
  showElement(recipeView);
  showElement(homeButton);
  recipeView.innerHTML = "";
  recipeView.innerHTML = `
  <section class="recipe-boxes" id="boxFour">
    <h3 class="recipe-name">${selectedRecipe.singleRecipe.name}</h3>
    <img class="recipe-image" src="${
      selectedRecipe.singleRecipe.image
    }" alt="recipe image" />
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
};
const showElement = (element) => {
  element.classList.remove("hidden");
};
//${selectedRecipe.singleRecipe.name}
//${selectedRecipe.singleRecipe.image}
const hideElement = (element) => {
  element.classList.add("hidden");
};

const userSearchFavorites = (searchText) => {
  if (event.target.className.includes("search-input")) {
    currentRecipes.repositoryData = randomUser
      .filterFavsByTag(searchText)
      .concat(randomUser.filterFavsByName(searchText));
  }
  if (searchText === "") {
    pageTitle.innerText = `Let's Look at Your Favorites!`;
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
  // event.target.className.includes("search-input")
  currentRecipes.repositoryData = allRecipes
    .filterByTag(searchText)
    .concat(allRecipes.filterByName(searchText));
  showElement(homeButton);

  if (searchText === "") {
    pageTitle.innerText = `Let's Find a Recipe!`;
  } else if (currentRecipes.repositoryData.length) {
    pageTitle.innerText = `Here are your results for ${searchText}:`;
  } else {
    pageTitle.innerText =
      "Sorry, we couldn't find what you're looking for, please try again.";
  }
  console.log("current resps", currentRecipes);
  displayAllRecipes(currentRecipes);
};
//-----------------------------------------------------------------------------
const toggleToCook = (recipe, id) => {
  // const addToCookButtons = document.querySelectorAll(".to-cook-buttons");
  console.log("line 224", recipe);
  if (randomUser.recipesToCook.includes(recipe)) {
    randomUser.deleteFromCook(recipe);
    allRecipes.repositoryData[id].addedToCook = false;
  } else {
    randomUser.addToCook(recipe);
    allRecipes.repositoryData[id].addedToCook = true;
    console.log("line 233", allRecipes.repositoryData[id]);
  }

  displayAllRecipes(currentRecipes);
};

const toggleFavorites = (recipe, id) => {
  // const addToFavoritesButtons = document.querySelectorAll(".favorites-buttons");
  console.log("We are in togglefaves section");
  if (randomUser.favoriteRecipes.includes(recipe)) {
    console.log("recipe present in faves");
    allRecipes.repositoryData[id].favorited = false;
    randomUser.deleteFromFavorites(recipe);
  } else {
    console.log("253", recipe);
    allRecipes.repositoryData[id].favorited = true;
    console.log(allRecipes.repositoryData[id]);
    randomUser.addToFavorite(allRecipes.repositoryData[id]);
  }

  console.log("allrecipes after toggle fave", allRecipes);
  console.log(" current recipes after toggle fav", currentRecipes);
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
