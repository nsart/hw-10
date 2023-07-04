import './css/common.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { refs, hideLoaders, showLoaders, hideSelect, showSelect } from './js/tools';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

new SlimSelect({
    select: '#single',
  });


hideSelect();
refs.errorel.classList.add('hidden');
// make p.loader 'hidden' forever for nice loader image:
refs.loaderel.classList.add('hidden');
refs.select.setAttribute('id', 'single');
refs.loaderel.insertAdjacentHTML(
  'beforebegin',
  `<div class="section"><span class='loader-img'></span></div>`
);
export const loadImage = document.querySelector('div.section');

loadImage.classList.add('visible');
setTimeout(() => {
  loadBreeds();
}, 0);

refs.select.addEventListener('change', catCard)

function catCard() {
    showLoaders();
    refs.catinfoel.innerHTML = '';
    let idval = refs.select.value;
    fetchCatByBreed(idval)
      .then(data => {
        if (idval === '...') {
          hideLoaders();
          Notify.success('Choose one cat from the list');
          return;
        }
        const catCard = data.map(({url, breeds})=>{
            return `<div class='cat-card' id="parent">
            <img src=${url} alt=${breeds[0].name} width="auto">            
            <H2>${breeds[0].name}</H2>
            <p id="child">${breeds[0].description}</p>
            <h4>Temperament:</h4>
            <p id="child">${breeds[0].temperament}</p>
            </div>`

            });
        refs.catinfoel.insertAdjacentHTML('beforeend', catCard);
        hideLoaders();
        showSelect();
        Notify.success('Successfully loaded one cat');
      })
      .catch(err => {
        console.log(err);
        hideLoaders();
        hideSelect();
        refs.catinfoel.classList.add('hidden');
        Notify.failure(`${refs.errorel.textContent}`);
      });
  }

function loadBreeds(){
    const startOption = `<option value="...">...</option>`;
    refs.select.insertAdjacentHTML('afterbegin', startOption);
    fetchBreeds()
    .then((data => {
    for (let id in data) {
        const option = document.createElement('option');
        option.value = data[id].id;
        option.text = data[id].name;
        // select.prepend(option); // за спаданням
        refs.select.append(option); // за зростанням
    }
    if (data){       
        hideLoaders();
        showSelect();
        Notify.success('Successfully loaded all breeds');
    }
      new SlimSelect({
        select: '#single',
      });
    
  }))
  .catch((err)=> {
    console.log(err);
    refs.select.classList.add('hidden');
    Notify.failure(`${refs.errorel.textContent}`);
    });
  
}




