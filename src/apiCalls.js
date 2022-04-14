// 1. put in HTML <p class="js-error"></p> above script files at the bottom -DONE
// 2. make QS for js-error -DONE
// 3. create .catch for GET requests -DONE
// 4. create function for it: displayError -DONE
// REcreate error? -???
// 5.

//----------Query Selectors----------//
const errorMsg = document.querySelector('.js-error');

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

const displayError = (error) => {
  if (error.message === "Failed to Fetch!") {
    errorMsg.innerText = "Ops, sorry! Something went wrong! Try again!";
  } else {
    errorMsg.innerText = error.message;
  }
};

//----------Event Listeners----------//


//----------Exports----------//
export { fetchAll, apiUsersData, apiIngredientsData, apiRecipeData };
