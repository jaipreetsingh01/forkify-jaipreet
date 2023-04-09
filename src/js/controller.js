import 'core-js';
import 'regenerator';
import { API_URL } from './config';
import * as icons from '../img/icons.svg';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipes = async function () {
  try {
    // console.log('Recipe');
    let id = location.hash.slice(1);

    if (model.state.bookmarksList.length != 0)
      bookmarksView.render(model.state.bookmarksList);
    else bookmarksView.renderError('');

    if (!id) return;

    recipeView.renderSpinner();

    //LOAD RECIPE DATA
    await model.loadRecipe(id);
    let recipe = model.state.recipe;
    // console.log(recipe);

    //LOAD RECIPE UI {FRONT END}
    recipeView.render(recipe);

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};

// model.searchRecipe('pizza');
const searchRecipes = async function () {
  try {
    const query = searchView.getQuery();

    resultsView.renderSpinner();

    //prettier-ignore
    await model.searchRecipe(query, 1);
    // console.log(model.state);
    resultsView.render(model.state);
    paginationView.render(model.state);
    // model.updateServings(1);
  } catch (err) {
    resultsView.renderError(err);
  }
};

// const goToPage
const paginationControl = async function (page) {
  resultsView.renderSpinner();

  await model.searchRecipe(model.state.query, page);
  // console.log(model.state);
  resultsView.render(model.state);
  paginationView.render(model.state);
};

const updateServings = function (servingsGoTo) {
  model.updateServings(servingsGoTo);
  recipeView.render(model.state.recipe);
};

const bookmarkCurrentRecipe = function () {
  if (!model.state.recipe.bookmarked) model.bookmarkRecipe(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  // console.log('Bookmark clicked');

  if (model.state.bookmarksList.length != 0)
    bookmarksView.render(model.state.bookmarksList);
  else bookmarksView.renderError('');

  recipeView.render(model.state.recipe);
};

//TRIGGER THE EVENT CHANGES
const init = function () {
  recipeView.addHandlerRecipe(getRecipes);
  searchView.addHandlerSearch(searchRecipes);
  paginationView.addHandlerPagination(paginationControl);
  recipeView.addHandlerUpdateServings(updateServings);
  recipeView.addHandlerBookmark(bookmarkCurrentRecipe);
};

init();
