//----------Query Selectors----------//
const errorMsg = document.querySelector('.page-title-section');
const pantryForm = document.querySelector('.add-ingredients-form');

//---------Global Variables----------//
let apiUsersData, apiIngredientsData, apiRecipeData;

//----------Functions----------//
const fetchData = (param) => {
  return fetch(`http://localhost:3001/api/v1/${param}`)
    .then((response) => response.json())
    .catch((error) => displayError(error))
};

const fetchAll = () => {
  apiUsersData = fetchData("users");
  apiIngredientsData = fetchData("ingredients");
  apiRecipeData = fetchData("recipes");
};

const postPantryStock = (pantryStock) => {
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(pantryStock),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => checkError(response))
  .catch((error) => displayError(error))
};

const submitPantryForm = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const pantryStock = {
    userID: parseInt(formData.get('user-id')),
    ingredientID: parseInt(formData.get('ingredient-id')),
    ingredientModification: parseInt(formData.get('ingredient-modification'))
  };
  postPantryStock(pantryStock);
  e.target.reset();
};


const displayError = (error) => {
  if (error.message === "Failed to fetch") {
    errorMsg.innerText = "Ops, sorry! Something went wrong! Try again!";
  } else {
    errorMsg.innerText = error.message;
  }
};

const checkError = (response) => {
  if (!response.ok) {
    throw new Error("Please enter correct information!")
  } else {
    response.json()
  }
};

//----------Event Listeners----------//
pantryForm.addEventListener('submit', submitPantryForm);

//----------Exports----------//
export { fetchAll, apiUsersData, apiIngredientsData, apiRecipeData };
