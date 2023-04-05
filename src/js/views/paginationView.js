import * as icons from '../../img/icons.svg';
import View from './View';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup(data) {
    let html;
    const currPage = +this._data.currentPage;
    const totalPages = +this._data.totalPages;
    //IF CURR PAGE IS 1 AND THERE ARE MORE PAGES
    if (currPage === 1 && currPage < totalPages);
    html = `
    <div class="pagination">
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  </div>`;

    //IF CUUR PAGE IS 1 AND TOTAL PAGES ==1
    if (currPage === totalPages && totalPages === 1) html = '';

    // IF CURR PAGE >1 AND <TOTAL
    if (currPage > 1 && currPage < totalPages)
      html = `<div class="pagination">
    <button data-goto="${
      currPage - 1
    }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>

    <button data-goto="${
      currPage + 1
    }"class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  </div>`;

    if (currPage === totalPages && totalPages != 1)
      html = `<div class="pagination">
  <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currPage - 1}</span>
  </button>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goTo = btn.dataset.goto;
      handler(goTo);
    });
  }
}

export default new paginationView();
