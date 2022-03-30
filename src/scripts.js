import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import RecipeRepository from '../src/classes/RecipeRepository';

const box1 = document.getElementById('boxOne');
const box2 = document.getElementById('boxTwo');
const box3 = document.getElementById('boxThree');

const forwardButton = document.getElementById('goForward');
const backwardButton = document.getElementById('goBackward');
const recipeName = document.querySelector('.recipe-name');
const recipeImage = document.querySelector('.recipe-image');
const favoriteButton = document.getElementById('addFavorite');
const wantToCookButton = document.getElementById('wantToCook');

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


console.log('hello world');
