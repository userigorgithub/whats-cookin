import "./styles.css";
import apiCalls from "./apiCalls";
import {
  fetchAll,
  apiUsersData,
  apiIngredientsData,
  apiRecipeData,
  postPantryStock,
  updateUserPantryStock
} from "./apiCalls.js";
import "./images/logo.png";
import "./images/search.png";
import "./images/add.png";
import "./images/minus.png";
import "./images/love.png";
import "./images/heart.png";
import "./images/cooking.png";
import Recipe from "../src/classes/Recipe";
import Ingredient from "../src/classes/Ingredient";
import RecipeRepository from "../src/classes/RecipeRepository";
import User from "../src/classes/User";
import Pantry from "../src/classes/Pantry";

//----------Query Selectors----------//
const mainSection = document.querySelector(".main-section");
const recipeView = document.querySelector(".recipe-view");
const pantryView = document.querySelector(".pantry-view");
const pantryIngredientsList = document.querySelector(
  ".pantry-ingredients-list"
);
const recipeIngredientsList = document.querySelector(".pantry-recipe-list");
const recipesDropDown = document.getElementById("recipesDropDown");
const pageTitle = document.querySelector(".page-title-section");
const welcomeUser = document.querySelector(".user-welcome");
const forwardButton = document.getElementById("goForward");
const backwardButton = document.getElementById("goBackward");
const boxOfRecipes = document.querySelector(".box-of-recipes");
const favoriteButton = document.getElementById("addFavorite");
const addToCookButton = document.getElementById("addToCook");
const homeButton = document.getElementById("homeButton");
const favoritesButton = document.getElementById("favoritesButton");
const pantryButton = document.getElementById("pantryButton");
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
const userID = document.getElementById("userID");

//---------Global Variables----------//
let recipeData,
  usersData,
  ingredientsData,
  currentRecipes,
  randomUser,
  allRecipes,
  userPantry;

//----------Functions----------//
const loadPage = () => {
  fetchAll();
  Promise.all([apiUsersData, apiIngredientsData, apiRecipeData]).then((data) =>
    setGlobalVariablesAndDisplay(data)
  );
};

const setGlobalVariablesAndDisplay = (data) => {
  usersData = data[0];
  ingredientsData = data[1];
  recipeData = data[2];
  if (!randomUser) {
    allRecipes = new RecipeRepository(recipeData);
    allRecipes.addDefaultPreferences();
    allRecipes.repositoryData.sort((a, b) => 0.5 - Math.random());
    currentRecipes = allRecipes;
    randomUser = new User(
    usersData[Math.floor(Math.random() * usersData.length)])
    displayAllRecipes(allRecipes);
    userID.value = randomUser.singleUser.id;
    welcomeUser.innerText = `Welcome back, ${randomUser.returnUserFirstName()}!`;
    userPantry = new Pantry(randomUser.singleUser.pantry);
  } else {
    randomUser.singleUser.pantry = usersData.find(user => user.id === randomUser.singleUser.id).pantry
    userPantry = new Pantry(randomUser.singleUser.pantry);
    goToPantry();
  };
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
  hideElement([homeButton, recipeView, pantryView]);
  showElement([
    bottomSection,
    mainSection,
    favoritesButton,
    wantToCookButton,
    searchContainer,
    pantryButton,
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
  hideElement([recipeView, favoritesButton, pantryView]);
  showElement([
    bottomSection,
    homeButton,
    mainSection,
    searchContainer,
    wantToCookButton,
    pantryButton,
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

const goToPantry = () => {
  goHome();
  hideElement([
    recipeView,
    pantryButton,
    bottomSection,
    mainSection,
    searchContainer,
  ]);
  showElement([homeButton, pantryView, favoritesButton, wantToCookButton]);
  determinePantryIngredientNames(randomUser.singleUser.pantry, ingredientsData);
  displayToCookRecipesInPantry();
  pageTitle.innerText = "My Pantry!";
  recipeIngredientsList.innerText = "Please select a recipe.";
};

const goToWantToCook = () => {
  goHome();
  hideElement([recipeView, wantToCookButton, searchContainer, pantryView]);
  showElement([
    bottomSection,
    homeButton,
    mainSection,
    favoritesButton,
    pantryButton,
  ]);
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
  goHome();
  const selectedRecipe = new Recipe(
    currentRecipes.repositoryData[selectedIndex]
  );
  hideElement([bottomSection, mainSection, searchContainer, pantryView]);
  showElement([recipeView, homeButton, pantryButton]);
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
    <img
      label="button"
      class="cooking-image"
      src="./images/cooking.png"
      alt="cooking pan icon"
      data-index-number="${selectedIndex}"
      />
      <label for="cooking-pan-image"></label>
      <h4 class="cook-now-prompt">Click to Cook This Recipe Now!</h4>
    </section>
    <section class="recipe-details-section">
      <article class="instructions">Instructions:<br> ${selectedRecipe.getInstructions()}</article>
      <article class="ingredients">Ingredients:<br><br>${selectedRecipe.storeIngredientNames(
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
  const cookingImage = document.querySelector(".cooking-image");
  cookingImage.addEventListener("click", (e) => {
    cookNow(e.target);
  });
};

const cookNow = (identification) => {
  const stillNeeded = document.querySelector(".ingredients");
  const cookNowPrompt = document.querySelector(".cook-now-prompt");
  const cookNowRecipe = new Recipe(
    currentRecipes.repositoryData[identification.dataset.indexNumber]
  );
  if (userPantry.checkUserStock(cookNowRecipe, ingredientsData) !== true) {
    stillNeeded.innerHTML = `${userPantry.checkUserStock(
      cookNowRecipe,
      ingredientsData
    )}`;
  } else {
    cookNowPrompt.innerText =
    "Enjoy Your meal, we've removed the correct ingredients from your pantry to cook this.";
    setTimeout(() => {changeStock(cookNowRecipe.singleRecipe.name)}, 4000)
  }
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

const changeStock = (dataName, subtractStock = -1) => {

fetch(`http://localhost:3001/api/v1/recipes`)
      .then((response) => response.json())
      .then((response) => subtractRecipe(response,dataName))
      .catch((error) => console.log("error on removing items from pantry"));

}

const subtractRecipe = (recipeDataRestored,dataName) => {
  const filteredRecipe = recipeDataRestored.find(recipe => recipe.name === dataName)
  filteredRecipe.ingredients.forEach((recipeIngredient, index) => {
    randomUser.singleUser.pantry.forEach((pantryIngredient) => {
      if (recipeIngredient.id === pantryIngredient.ingredient) {
        postPantryStock({
          userID: parseInt(randomUser.singleUser.id),
          ingredientID: parseInt(pantryIngredient.ingredient),
          ingredientModification: parseInt(recipeIngredient.quantity.amount)*-1});
      }
    });
  });
};

const determinePantryIngredientNames = (pantryIngredients, ingredientsData) => {
  pantryIngredientsList.innerHTML = "";
  return pantryIngredients
    .map((ingredient) => {
      ingredientsData.forEach((ingredientItemInRepository) => {
        if (ingredient.ingredient === ingredientItemInRepository.id) {
          ingredient.name = ingredientItemInRepository.name
        }
      });
      return ingredient;
    })
    .map(
      (e) =>
        (pantryIngredientsList.innerHTML += `<ul>${e.name} 🍽 ${e.amount}</ul>`)
    );
};

const displayToCookRecipesInPantry = () => {
  recipesDropDown.innerHTML = `<option value="">Select a Recipe</option>`;
  const recipesToCookInPantry = allRecipes.repositoryData
    .filter((recipe) => recipe.addedToCook)
    .map((recipe) => {
      return recipe.name;
    });
  return recipesToCookInPantry.map(
    (e) => (recipesDropDown.innerHTML += `<option value="${e}">${e}</option>`)
  );
};

const getWTCPantryIngredients = (ingredientsData, recipeTitle) => {
  recipeIngredientsList.innerHTML = "";
  const recipeIngredients = randomUser.recipesToCook
    .filter((recipe) => {
      return recipe.name === recipeTitle;
    })
    .map((recipe) => {
      return recipe.ingredients;
    });
  return recipeIngredients
    .flat()
    .map((ingredient) => {
      ingredientsData.forEach((ingredientItemInRepository) => {
        if (ingredient.id === ingredientItemInRepository.id) {
          ingredient.id = ingredientItemInRepository.name;
        }
      });
      return ingredient;
    })
    .map(
      (e) =>
        (recipeIngredientsList.innerHTML += `<ul>${e.id} 🍽 ${e.quantity.amount} ${e.quantity.unit}</ul>`)
    );
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
pantryButton.addEventListener("click", (e) => goToPantry());
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
recipesDropDown.addEventListener("change", (e) => {
  getWTCPantryIngredients(ingredientsData, e.target.value);
});

export { loadPage, goToPantry, goHome };
