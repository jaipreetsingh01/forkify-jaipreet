import * as icons from '../../img/icons.svg';

export default class View {
  _parentElement;
  _data;
  _errorMessage = '';

  render(data) {
    if (!data) return;
    this._data = data;
    this._generateMarkup(this._data); // passing data as recipe
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const html = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderError() {
    console.log('Error Generated');
    const html = `
        <div class="error">
            <div>
                <svg>
                <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${this._errorMessage}</p>
        </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}
