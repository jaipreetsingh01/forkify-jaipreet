import { API_URL } from './config.js';
import { id } from './controller.js';
import { getJSON } from './helper';
import { RESULTS_PER_PAGES } from './config.js';

export let state = {
  recipe: {},
  query: '',
  results: [],
  currentResults: [],
  currentPage: 1,
  bookmarksList: [],
};

export const loadRecipe = async function (id) {
  try {
    const { recipe } = await getJSON(`${API_URL}${id}`);

    state.recipe.cookingTime = recipe.cooking_time;
    state.recipe.id = recipe.id;
    state.recipe.image = recipe.image_url;
    state.recipe.ingredients = recipe.ingredients;
    state.recipe.publisher = recipe.publisher;
    state.recipe.servings = recipe.servings;
    state.recipe.url = recipe.source_url;
    state.recipe.title = recipe.title;

    if (state.bookmarksList.some(bookmark => bookmark.id === recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchRecipe = async function (query, goToPage) {
  try {
    state.query = query;
    const results = await getJSON(`${API_URL}?search=${query}`);
    // console.log(results);
    if (results.recipes.length === 0)
      throw new Error(`No Search Results found, please try another query`);
    state.results = results.recipes;

    const totalPages = calculatePages();
    state.currentPage = goToPage;
    state.totalPages = totalPages;

    const startPage = (goToPage - 1) * 10;
    const endPage = goToPage * 10;

    state.currentResults = state.results.slice(startPage, endPage);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const calculatePages = function () {
  return Math.ceil(state.results.length / RESULTS_PER_PAGES);
};

export const updateServings = function (newAmount) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newAmount) / state.recipe.servings;
  });

  state.recipe.servings = newAmount;
};

const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarksList));
};

export const bookmarkRecipe = function (recipe) {
  state.bookmarksList.push(JSON.parse(JSON.stringify(recipe)));
  state.recipe.bookmarked = true;

  storeBookmarks();

  // console.log(state.bookmarksList);
};

export const deleteBookmark = function (id) {
  console.log('delete clicked');
  const index = state.bookmarksList.findIndex(el => id === el.id);
  state.bookmarksList.splice(index, 1);

  state.recipe.bookmarked = false;

  storeBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarksList = JSON.parse(storage);
};

init();
