// 1. put in HTML <p class="js-error"></p> above script files at the bottom
// 2. make QS for js-error - DONE

const errorMsg = document.querySelector('.js-error');

let apiUsersData, apiIngredientsData, apiRecipeData;

const fetchData = (param) => {
  return fetch(`http://localhost:3001/api/v1/${param}`).then((response) =>
    response.json()
  );
};

const fetchAll = () => {
  apiUsersData = fetchData("users");
  apiIngredientsData = fetchData("ingredients");
  apiRecipeData = fetchData("recipes");
};

export { fetchAll, apiUsersData, apiIngredientsData, apiRecipeData };
