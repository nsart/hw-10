import { loadImage } from '../index';

const refs = {
  select: document.querySelector('select'),
  loaderel: document.querySelector('.loader'),
  errorel: document.querySelector('.error'),
  catinfoel: document.querySelector('.cat-info'),
};

function showSelect() {
    refs.select.classList.remove('hidden');
    refs.select.classList.add('visible');
}

function hideSelect() {
    refs.select.classList.add('hidden');
    refs.select.classList.remove('visible');
}

function showLoaders() {
  loadImage.classList.remove('hidden');
  loadImage.classList.add('visible');
}

function hideLoaders() {
  loadImage.classList.add('hidden');
  loadImage.classList.remove('visible');
}

export {refs, showLoaders, hideLoaders, hideSelect, showSelect };