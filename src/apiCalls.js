// 1. put in HTML <p class="js-error"></p> above script files at the bottom -DONE
// 2. make QS for js-error -DONE
// 3. create .catch for GET requests -DONE
// 4. create function for it: displayError -DONE
//note: recreate error - don't run whats-cookin-api (do run main app) -message at the bottom

// 5. create POST request function changePantryStock/addPantryStock for pantry -PARTIAL
//note: adding ings only?
//note: subtracting upon other button (To Cook!) click? therefore...
//note: will it create or is it separate POST request from adding?
// 6. create .catch for POST requests -DONE
// 7. create function to checkErrors for POST responses when user enters data -DONE

// -TO DO-
// 8. create QS for form button? submitIngredientForm- id
// 9. create EL for submit's querySelector
// 10. create function for POST req using form


//----------Query Selectors----------//
const errorMsg = document.querySelector('.page-title-section');
// #8

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

const changePantryStock = (pantryStock) => {
  fetch(apiUsersData, { // only apiUsersData here since we alter that user's pantry?
    method: 'POST',
    body: JSON.stringify(pantryStock), // remember how HTTP can only send and receive strings, just like localStorage?
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => checkError(response)) //checkError function
  .catch((error) => displayError(error))
};

// #10 FUNCTION


const displayError = (error) => {
  if (error.message === "Failed to fetch") {
    errorMsg.innerText = "Ops, sorry! Something went wrong! Try again!";
  } else {
    errorMsg.innerText = error.message;
  }
};

const checkError = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText)
  } else {
    response.json()
  }
};


//----------Event Listeners----------//
// #9

//----------Exports----------//
export { fetchAll, apiUsersData, apiIngredientsData, apiRecipeData };
