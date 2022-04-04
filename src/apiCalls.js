let apiUsersData, apiIngredientsData, apiRecipeData;

const fetchAll = () => {

apiUsersData =
fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
.then(response => response.json())

apiIngredientsData =
fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
.then(response => response.json());

apiRecipeData =
fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
.then(response => response.json());
}

export {fetchAll, apiUsersData, apiIngredientsData, apiRecipeData}
