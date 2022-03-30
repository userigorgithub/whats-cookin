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

console.log('hello world');
