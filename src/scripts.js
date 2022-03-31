import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import RecipeRepository from '../src/classes/RecipeRepository';
import recipeData from '../src/data/recipes.js';

const box1 = document.getElementById('boxOne');
const box2 = document.getElementById('boxTwo');
const box3 = document.getElementById('boxThree');
const box4 = document.getElementById('boxFour');

const forwardButton = document.getElementById('goForward');
const backwardButton = document.getElementById('goBackward');
const boxOfRecipes = document.querySelector('.box-of-recipes');
const recipeName = document.querySelector('.recipe-name');
const recipeImage = document.querySelector('.recipe-image');
const favoriteButton = document.getElementById('addFavorite');
const addToCookButton = document.getElementById('addToCook');

const homeButton = document.getElementById('homeButton');
const favoritesButton = document.getElementById('favoritesButton');
const wantToCookButton = document.getElementById('wantToCookButton');

const instructions = document.querySelector('.instructions');
const ingredients = document.querySelector('.ingredients');
const costRecipe = document.querySelector('.cost-recipe');

const searchBar = document.getElementById('search');

const sideDish = document.getElementById('sideDish');
const mainDish = document.getElementById('mainDish');
const dessert = document.getElementById('dessert');

const allRecipes = new RecipeRepository(recipeData).repositoryData;
    allRecipes.sort((a, b) => 0.5 - Math.random());

const displayAllRecipes = () => {
  boxOfRecipes.innerHTML ="";

  let showInDom = allRecipes
  .filter((recipe,index)=> (index <= 2))
  .map((recipe,index)=>
    boxOfRecipes.innerHTML +=
    `<section class="recipe-boxes" id="${recipe.id}">
      <h3 class="recipe-name">${recipe.name}</h3>
      <img class="recipe-image" src="${recipe.image}" alt="recipe image" />
      <section class="recipe-actions">
        <button class="recipe-action-buttons" id="addToCook">
          Add to Cook
        </button>
        <button class="recipe-action-buttons" id="addFavorite">
          Favorite
        </button>
      </section>
    </section>`
  )

};

const shiftForward = () => {
    allRecipes.push(allRecipes[0]);
    allRecipes.shift()
    displayAllRecipes();
}

const shiftBackward = () => {
  allRecipes.unshift(allRecipes[allRecipes.length-1])
  allRecipes.pop();
  displayAllRecipes();
}

window.addEventListener('load', e => displayAllRecipes());
forwardButton.addEventListener('click', e => shiftForward());
backwardButton.addEventListener('click', e => shiftBackward());
