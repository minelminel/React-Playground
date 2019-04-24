import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
// import logo from './logo.svg';
import './App.css';

const App = () => {

  const APP_ID = "0b9b1a80";
  const APP_KEY = "0e7fe122568a641a6b0bf97ae63e4e25";

  const [recipes, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('') // defualt query shown on 1st visit

  useEffect(() => {
    getRecipes();
    console.log("We are fetching data");
  // eslint-disable-next-line
  }, [query]);

  // by adding ', []' to useEffect, we force the function
  // to run ONLY on page refresh - NOT responsive.
  // by adding [<stuff>] it runs anytime Counter changes.


  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipe(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    // display recursive text from field as typed with console.log(search) here
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <h1>Recipes</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
          <button className="search-button" type="submit">
            Search
          </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
          key={recipe.recipe.uri}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
