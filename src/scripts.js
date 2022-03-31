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

const displayAllRecipes = () => {
  const allRecipes = new RecipeRepository(recipeData).repositoryData;
  allRecipes.sort((a, b) => 0.5 - Math.random());

}


console.log('hello world');

window.addEventListener('load', displayAllRecipes);
