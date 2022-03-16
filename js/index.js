
import { renderPokemon,getImagen } from "./pokedex.js";
const $form = document.querySelector('#form');
const $next = document.querySelector('#next-pokemon');
const $prev = document.querySelector('#pre-pokemon');
const $pokedex = document.querySelector('#pokedex');
const $nextImg = document.querySelector('#next-imagen');
const $prevImg = document.querySelector('#prev-imagen');
const $random = document.querySelector('#random');


$form.addEventListener ('submit', handleSubmit);

$next.addEventListener ('click', handleNextPokemon);
$prev.addEventListener ('click', handlePrevPokemon);

$nextImg.addEventListener ('click', handleNextImg);
$prevImg.addEventListener ('click', handlePrevImg);
$random.addEventListener ('click', handleRandom);

let activePokemon =null;
let form = null
let id = null;
async function handleSubmit(event){
  event.preventDefault();
  $pokedex.classList.add('is-open');
   form = new FormData($form);
   id = form.get('id');
  activePokemon = await renderPokemon(id);
}

async function handleRandom(event){
  let random = Math.floor(Math.random() * (893 - 1)) + 12;
  activePokemon = await renderPokemon(random);
}

async function handleNextPokemon(event){
  let id = (activePokemon === null || activePokemon.id === 893  )? 1 : activePokemon.id + 1;
    activePokemon =  await renderPokemon(id);
}

async function handlePrevPokemon(event){
  let id = (activePokemon === null || activePokemon.id === 1  )? 893 : activePokemon.id - 1;
    activePokemon =  await renderPokemon(id);
}
let activeSprite = 0

function handleNextImg(event){
  if (activePokemon === null ) return false;
  changeImg((activeSprite <= 0 ) ?  activeSprite = activePokemon.sprites.length - 1  : activeSprite = activeSprite - 1);
}

function handlePrevImg(event){
  if (activePokemon === null ) return false;
  changeImg((activeSprite >= activePokemon.sprites.length - 1 ) ?  activeSprite = 0 : activeSprite = activeSprite + 1);
}

function changeImg(idImg){
  getImagen(activePokemon.sprites[idImg]);
}