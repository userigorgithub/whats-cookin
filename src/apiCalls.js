// Your fetch requests will live here!
let usersData, ingredientsData, recipeData;

const fetchAll = () => {

usersData =
fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
.then(response => response.json());

ingredientsData =
fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
.then(response => response.json());

recipeData =
fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
.then(response => response.json());
}

export {fetchAll, usersData, ingredientsData, recipeData};
console.log('I will be a fetch request!')
