const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-img')

const form = document.querySelector('.search')
const input = document.querySelector('.poke-search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
         return data;
    } 
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon (pokemon);
 
    if(data){
        pokemonImage.style.display = 'block';
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name; 
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = ''; 
        searchPokemon = data.id;

    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = 'XXX';

        input.value = ''; 
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click', () => {
    
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


buttonNext.addEventListener('click', function(){
    const audio = document.querySelector('audio')
    audio.currentTime = 0.1
    audio.play()
})

buttonPrev.addEventListener('click', function(){
    const audio = document.querySelector('audio')
    audio.currentTime = 0.1
    audio.play()
})


renderPokemon(searchPokemon);

