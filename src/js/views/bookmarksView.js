import * as icons from '../../img/icons.svg';
import View from './View';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  //   _pagination = document.querySelector('.pagination');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it`;

  _generateMarkup(data) {
    const html = data
      .map(recipe => {
        return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="Test" />
        </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>`;
      })
      .join('');

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
    // this._generatePagination(data.currentPage, data.totalPages);
  }
}

export default new bookmarksView();
