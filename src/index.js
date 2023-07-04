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
          Notify.failure('Choose one cat from the list');
          return;
        }
        const catCard = data.map(({url, breeds})=>{
            return `<div class='cat-card'>
            <img src=${url} alt=${breeds[0].name}> 
            <div id='child'>
            <H2>${breeds[0].name}</H2>
            <p>${breeds[0].description}</p>
            <h4>Temperament:</h4>
            <p>${breeds[0].temperament}</p>
            </div>
            </div>`

            });
            refs.catinfoel.insertAdjacentHTML('beforeend', catCard);
        if (data.length){ 
        hideLoaders();
        showSelect();
        Notify.success('Successfully loaded one cat');
        }
        else{
          Notify.failure('This cat was not found!');
        }
      })
      .catch(err => {
        console.log(err);
        hideLoaders();
        hideSelect();
        refs.catinfoel.classList.add('hidden');
        Notify.failure(`${refs.errorel.textContent}`);
      });
  }

  function htmlMarkup(arr){
  const markup = arr
  .map(({ id, name }) => {
    return `<option value=${id}>${name}</option>`;
  })
  .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

function loadBreeds(){
    const startOption = `<option value="...">~~~ Please make a choice ~~~</option>`;
    refs.select.insertAdjacentHTML('afterbegin', startOption);
    fetchBreeds()
    .then((data => {
    // for (let id in data) {
    //     const option = document.createElement('option');
    //     option.value = data[id].id;
    //     option.text = data[id].name;
    //     // select.prepend(option); // за спаданням
    //     refs.select.append(option); // за зростанням
    // }

    htmlMarkup(data);
    if (data.length){       
        hideLoaders();
        showSelect();
        Notify.success('Successfully loaded all breeds');
    }    
  }))
  .catch((err)=> {
    console.log(err);
    refs.select.classList.add('hidden');
    Notify.failure(`${refs.errorel.textContent}`);
    });
  
}




