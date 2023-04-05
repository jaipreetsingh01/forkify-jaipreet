import * as icons from '../../img/icons.svg';
import View from './View';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  //   _pagination = document.querySelector('.pagination');
  _errorMessage = `No Search Results found, please try another query`;

  _generateMarkup(data) {
    const html = data.currentResults
      .map(recipe => {
        return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image_url}" alt="Test" />
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

export default new resultsView();
