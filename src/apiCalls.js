
// 5. create POST request function changePantryStock/addPantryStock for pantry -PARTIAL
//note: adding ings only?
//note: subtracting upon other button (To Cook!) click? therefore...
//note: will it create or is it separate POST request from adding?
// 6. create .catch for POST requests -DONE
// 7. create function to checkErrors for POST responses when user enters data -DONE

// -TO DO-
// 8. create QS for form button? submitIngredientForm- id -DONE
// 9. create EL for submit's querySelector - DONE
// 10. create function for POST req using form -IN PROG


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
  fetch('http://localhost:3001/api/v1/users', { // only apiUsersData here since we alter that user's pantry?
    method: 'POST',
    body: JSON.stringify(pantryStock), // remember how HTTP can only send and receive strings, just like localStorage?
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => checkError(response))
  .catch((error) => displayError(error))
};

const submitPantryForm = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // console.log(randomUser)
  // console.log(formData.values())
  const pantryStock = {
    userID: parseInt(formData.get('user-id')),
    ingredientID: parseInt(formData.get('ingredient-id')),
    ingredientModification: parseInt(formData.get('ingredient-units'))
  };
  // const pantryStock = {
  //   userID: 1,
  //   ingredientID: 11297,
  //   ingredientModification: 1000
  // };
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
