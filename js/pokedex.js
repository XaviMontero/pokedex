

import {getPokemon, getSepecies} from './api.js';
import {createChart} from'./charts.js';
const $imagen = document.querySelector ('#imagen');
const $description = document.querySelector('#description-pokemon');
const $screen = document.querySelector('#screen');
const $ligth = document.querySelector('#ligth')
 async function getPokemonById(id){
  const pokemon = await getPokemon(id);
  const sepecies =await getSepecies(id);
  const sprites = [pokemon.sprites.front_default]

  for (const item in pokemon.sprites){
    if (pokemon.sprites[item] == null || item === "front_default" || item === 'other' ||  item === 'versions' ){
    }else {
      sprites.push(pokemon.sprites[item]);
    }
  }
   const flavorFilter = sepecies.flavor_text_entries.find(flavor => flavor.language.name === 'es');
  return {
    description:flavorFilter.flavor_text,
    img:sprites[0],
    sprites,
    id: pokemon.id,
    name: pokemon.name,
    stats:pokemon.stats
  }
}

export function isLoading(state= false){
   const img = state ?'url(../img/loading.gif)' :'';
   $screen.style.backgroundImage = img
}

export async function renderPokemon(id){
isLoading(true);
const pokemon = await getPokemonById(id);
isLoading(false);
getImagen(pokemon.img)
setDescription(pokemon.description);
speech(pokemon.name + ". " + pokemon.description);

if (activeChart instanceof Chart){
  activeChart.destroy();
}
activeChart = createChart(pokemon.stats);
return pokemon;
}
let activeChart = null;
export function getImagen(url){
  $imagen.src = url;
}

export  function setDescription(description){
  $description.textContent = description;
}


function speech(text){
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.lang='es';
  speechSynthesis.speak(utterance);
  $ligth.classList.add('is-animate');

  utterance.addEventListener('end', ()=>$ligth.classList.remove('is-animate'))
}