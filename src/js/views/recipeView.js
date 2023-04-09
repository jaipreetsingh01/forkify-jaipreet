import * as icons from '../../img/icons.svg';
import View from './View';
import { Fraction } from 'fractional';
import Fracty from 'fracty';

// console.log(Fracty(0.5));

class recipeView extends View {
  //   #data;
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _ServingsContainer = document.querySelector('.recipe__info-buttons');

  //   render(data) {
  //     if (!data) return;
  //     this._data = data;
  //     this._generateMarkup(this._data); // passing data as recipe
  //   }

  _generateMarkup(recipe) {
    const html = `
            <figure class="recipe__fig">
                <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
                <h1 class="recipe__title">
                <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--decrease-servings" data-update="${
                      recipe.servings - 1
                    }">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings" data-update="${
                      recipe.servings + 1
                    }">
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
                </div>

                <div class="recipe__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
                <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients
                  .map(
                    ingr => `<li class="recipe__ingredient">
                                                    <svg class="recipe__icon">
                                                    <use href="${icons}#icon-check"></use>
                                                    </svg>
                                                    <div class="recipe__quantity">${
                                                      ingr.quantity
                                                        ? Fracty(
                                                            ingr.quantity
                                                          ).toString()
                                                        : ''
                                                    }</div>
                                                    <div class="recipe__description">
                                                    <span class="recipe__unit">${
                                                      ingr.unit
                                                    }</span>
                                                    ${ingr.description}
                                                    </div>
                                                </li>`
                  )
                  .join('')}
                
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  recipe.publisher
                }</span>. Please check out
                directions at their website.
                </p>
                <a
                class="btn--small recipe__btn"
                href="${recipe.url}"
                target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </a>
            </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  addHandlerRecipe(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');

      if (!btn) return;

      console.log(btn.dataset.update);
      const updateTo = +btn.dataset.update;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      handler();
    });
  }
}

export default new recipeView();
