

import "./styles.css";
import apiCalls from "./apiCalls";
import {fetchAll, apiUsersData, apiIngredientsData, apiRecipeData} from "./apiCalls.js";
// An example of how you tell webpack to use an image (also need to link to it in the index.html) apiUsersData, apiIngredientsData, apiRecipeData,
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

//---------Global Variables----------//
let recipeData, usersData, ingredientsData, currentRecipes, allRecipes;
const loadFetch = () => {
  console.log('scripts JS loadFetch is working')
  fetchAll()
  Promise.all([apiUsersData, apiIngredientsData, apiRecipeData])
  .then(data => setGlobalVariables(data));
}

const setGlobalVariables = (data) => {
usersData = data[0].usersData;
ingredientsData = data[1].ingredientsData;
recipeData = data[2].recipeData;
console.log('recipe data within setglobal variables',recipeData)

 allRecipes = new RecipeRepository(recipeData);
allRecipes.addDefaultPreferences();
allRecipes.repositoryData.sort((a, b) => 0.5 - Math.random());
console.log("line 39", allRecipes);
 currentRecipes = allRecipes.repositoryData;

const randomUser = new User(
  usersData[Math.floor(Math.random() * usersData.length)]
)

welcomeUser.innerText = `Welcome back, ${randomUser.returnUserFirstName()}!`;
displayAllRecipes();

}
console.log('recipe data globally',recipeData)

//--------------------
// console.log('we shoudl have recipe data here',recipeData)
// const allRecipes = new RecipeRepository(recipeData);
// allRecipes.addDefaultPreferences();
// allRecipes.repositoryData.sort((a, b) => 0.5 - Math.random());
// console.log("line 39", allRecipes);
// let currentRecipes = allRecipes.repositoryData;
//
// const randomUser = new User(
//   usersData[Math.floor(Math.random() * usersData.length)]
// );

//----------Functions----------//


const displayAllRecipes = (currentRecipes = allRecipes.repositoryData) => {
  boxOfRecipes.innerHTML = "";

  let showInDom = currentRecipes
    .filter((recipe, index) => index <= 2)
    .map((recipe, mapIndex) => {
      let heart = "hidden";
      let love = "";
      let add = "";
      let minus = "hidden";
      console.log(allRecipes.repositoryData[mapIndex]);
      if (allRecipes.repositoryData[mapIndex].addedToCook) {
        minus = "";
        add = "hidden";
        // console.log(allRecipes.repositoryData[mapIndex]);
      }
      if (allRecipes.repositoryData[mapIndex].favorited) {
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
  console.log("user faves", randomUser.favoriteRecipes);
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
  currentRecipes = randomUser.recipesToCook;
  if (currentRecipes.length) {
    pageTitle.innerText = `Your Recipes To Cook!`;
  } else {
    pageTitle.innerText = `You Don't Have Any Recipes To Cook!`;
  }
  displayAllRecipes(currentRecipes);
};

// const displayClicked = (currentRecipes = allRecipes.repositoryData) => {
//   boxOfRecipes.innerHTML = "";
//
//   let showInDom = currentRecipes
//     .filter((recipe, index) => index <= 2)
//     .map(
//       (recipe, mapIndex) =>
//         (boxOfRecipes.innerHTML += `<section class="recipe-boxes" id="${recipe.id}">
//       <h3 class="recipe-name">${recipe.name}</h3>
//       <section class="recipe-image-holder"></section>
//         <img class="recipe-image" id=${mapIndex} src="${recipe.image}" alt="recipe image" />
//       <section class="recipe-actions">
//         <img class="favorites-buttons" id=${mapIndex} src="./images/heart.png" alt="heart-icon"/>
//         <img class="favorites-buttons" id=${mapIndex} src="./images/love.png" alt="love-icon"/>
//         <img class="to-cook-buttons" id=${mapIndex} src="./images/add.png" alt="add-icon"/>
//       </section>
//         <img class="to-cook-buttons" id=${mapIndex} src="./images/minus.png" alt="minus-icon"/>
//       </section>
//     </section>`)
//     );
// };

//-----------------------------------------
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
      <img class="favorites-buttons" src="./images/heart.png" alt="heart-icon" id=${selectedIndex}/>
      <img class="to-cook-buttons" src="./images/add.png" alt="add-icon" id=${selectedIndex}/>
    </section>
    </section>

    <section class="recipe-details-section">
      <article class="instructions">Instructions:<br>${selectedRecipe.getInstructions()}</article>
      <article class="ingredients">Ingredients:<br>${selectedRecipe.storeIngredientNames()}</article>
      <section class="other-recipe-info">
        <article class="cost-recipe">Recipe Cost: ${selectedRecipe.calculateRecipeCost()}</article>
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
//-----------------------------------------------------------------------------
const toggleToCook = (recipe, id) => {
  const addToCookButtons = document.querySelectorAll(".to-cook-buttons");
  console.log("line 224", recipe);
  if (randomUser.recipesToCook.includes(recipe)) {
    randomUser.deleteFromCook(recipe);
    //addToCookButtons[id].src = "./images/add.png";
    allRecipes.repositoryData[id].addedToCook = false;
  } else {
    randomUser.addToCook(recipe);
    //addToCookButtons[id].src = "./images/minus.png";
    allRecipes.repositoryData[id].addedToCook = true;
    console.log("line 233", allRecipes.repositoryData[id]);
  }
  displayAllRecipes(currentRecipes);
};

const toggleFavorites = (recipe, id) => {
  const addToFavoritesButtons = document.querySelectorAll(".favorites-buttons");
  console.log("We are in togglefaves section");
  if (randomUser.favoriteRecipes.includes(recipe)) {
    console.log("recipe present in faves");
    allRecipes.repositoryData[id].favorited = false;
    randomUser.deleteFromFavorites(recipe);
    //  addToFavoritesButtons[id].src = "./images/love.png";
  } else {
    console.log("253", recipe);
    allRecipes.repositoryData[id].favorited = true;
    console.log(allRecipes.repositoryData[id]);
    randomUser.addToFavorite(allRecipes.repositoryData[id]);

    //addToFavoritesButtons[id].src = "./images/heart.png";
  }
  displayAllRecipes(allRecipes.repositoryData);
};

//----------Event Listeners----------//
window.addEventListener("load", (e) => {
  loadFetch();
  // console.log('we shoudl have recipe data here',recipeData)
  // const allRecipes = new RecipeRepository(recipeData);
  // allRecipes.addDefaultPreferences();
  // allRecipes.repositoryData.sort((a, b) => 0.5 - Math.random());
  // console.log("line 39", allRecipes);
  // let currentRecipes = allRecipes.repositoryData;
  //
  // const randomUser = new User(
  //   usersData[Math.floor(Math.random() * usersData.length)]
  // );

  // welcomeUser.innerText = `Welcome back, ${randomUser.returnUserFirstName()}!`;
  // displayAllRecipes();
});

forwardButton.addEventListener("click", (e) => shiftForward());
backwardButton.addEventListener("click", (e) => shiftBackward());
boxOfRecipes.addEventListener("click", (e) => {
  console.log("264", event.target.className);
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
});

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
