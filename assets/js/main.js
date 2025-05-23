// ideia: Ao passar o mouse por cima dos pokemons, trocar a imagem para a forma Shiny.

console.log("Miguel é um gostoso");
const loadMoreButton = document.getElementById('loadMoreButton');
const select = document.getElementById('generation');
var limit = 16;
let offset;
let maxRecords;

window.addEventListener('load', function() {
    
    let valorGuardado = localStorage.getItem('geracaoSelecionada')
    select.value = valorGuardado;
    let offsetMaxRecords;
    
    switch (true) {
        case valorGuardado === '0':
            offsetMaxRecords = [0, 1302, 24];
            limit = offsetMaxRecords[2];
            break;
        case valorGuardado === '1':
            offsetMaxRecords = [0, 150];
            break;
        case valorGuardado === '2':
            offsetMaxRecords = [151, 250];
            break;
        case valorGuardado === '3':
            offsetMaxRecords = [251, 385];
            break;
        case valorGuardado === '4':
            offsetMaxRecords = [386, 492];
            break;
        case valorGuardado === '5':
            offsetMaxRecords = [493, 648];
            break;
        case valorGuardado === '6':
            offsetMaxRecords = [649, 720];
    }

    offset = offsetMaxRecords[0];
    maxRecords = offsetMaxRecords[1];
    loadMoreItens(offset, limit);
})

select.addEventListener('change', function(e) {
let valorSelecionado = e.target.value; 
console.log(valorSelecionado)
localStorage.setItem('geracaoSelecionada', valorSelecionado);
location.reload();

})
const pokemonLista = document.getElementById('pokemonListen');

async function loadMoreItens(offset, limit){
     
    const pokemon = await pokeApi.getPokemons(offset, limit)
    const newHtml = pokemon.map((pokemon) => ` 
    
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
    }
loadMoreButton.addEventListener('click', () => {
    offset += limit
    if (offset + limit >= maxRecords){
        limit = (maxRecords - offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        loadMoreItens(offset, limit)
    } else {
    
    console.log(limit)
    loadMoreItens(offset, limit)}

})

