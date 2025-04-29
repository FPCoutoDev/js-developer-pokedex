console.log("Miguel é um gostoso");
const loadMoreButton = document.getElementById('loadMoreButton');
let limit = 12;
let offset  = 0;
const maxRecords = 30;

const pokemonLista = document.getElementById('pokemonListen');


pokeApi.getPokemons().then((pokemons = []) => {
    pokemonLista.innerHTML = pokemons.map(convertPokemonToLi).join("")
})

function loadMoreItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => ` 
           <li class="${pokemon.type} pokemon">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join("")}
                </ol>
    
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
        </li>`).join("")
        pokemonLista.innerHTML += newHtml
    })
}

loadMoreItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    if (offset + limit > maxRecords){
        limit =  (offset + limit) - maxRecords
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    console.log(limit)
    loadMoreItens(offset, limit)

})