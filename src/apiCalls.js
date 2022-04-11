let apiUsersData, apiIngredientsData, apiRecipeData;

const fetchData = (param) => {
  return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${param}`)
    .then(response => response.json());
};

const fetchAll = () => {
  apiUsersData = fetchData('users');
  apiIngredientsData = fetchData('ingredients');
  apiRecipeData = fetchData('recipes');
}

export {fetchAll, apiUsersData, apiIngredientsData, apiRecipeData}
