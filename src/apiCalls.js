// 1. put in HTML <p class="js-error"></p> above script files at the bottom
// 2. make QS for js-error - DONE
// 3. create .catch for GET requests
// 4. create function for it: displayError


const errorMsg = document.querySelector('.js-error');

let apiUsersData, apiIngredientsData, apiRecipeData;

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



export { fetchAll, apiUsersData, apiIngredientsData, apiRecipeData };
