import axios from "axios";
// import {refs} from './ref.js'

const BASE_URL = 'https://api.thecatapi.com/v1';
const BREADS_LIST = 'breeds';
const SEARCH_POINT = 'images/search';
const KEY = "live_E4JLfSkjjqwViKbIwV2YZN8z6rdTcc8eEWXgdgltiBSx2QEDQjY3ZqguRRFm9btu";
axios.defaults.headers.common["x-api-key"] = KEY;

function fetchBreeds(){
    return axios.get(`${BASE_URL}/${BREADS_LIST}`)
    .then((response) => {
        if (response.status != 200)
        {
            throw new Error(response.statusText)
        }
        const breedsArray = response.data.map(({id, name})=>{
            return {id, name};
          });
        return breedsArray;
    })
}

function fetchCatByBreed(breedId){
    return axios.get(`${BASE_URL}/${SEARCH_POINT}?breed_ids=${breedId}`)
    .then((response) => {
        if (response.status != 200)
        {
            throw new Error(response.statusText)
        }
        return response.data;
    })
}

export {fetchBreeds, fetchCatByBreed };