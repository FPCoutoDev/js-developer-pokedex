// ideia: Ao passar o mouse por cima dos pokemons, trocar a imagem para a forma Shiny.

console.log("Miguel é um gostoso");
const loadMoreButton = document.getElementById('loadMoreButton');
const select = document.getElementById('generation');
var limit = 16;
let offset;
let maxRecords;
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
    
                <img class = "imagens" data-normal="${pokemon.photo}" data-shiny="${pokemon.shinyPhoto}" src="${pokemon.photo}" 
                alt="${pokemon.name}" title="Clique para visualizar a versão Shiny">
            </div>
        </li>`).join("")
        pokemonLista.innerHTML += newHtml
    
        const images = document.querySelectorAll('.imagens')
        for (let i = 0; i < images.length; i++) {
    const elementImage = images[i];
    elementImage.addEventListener('click', function(e) {
        if (elementImage.src === elementImage.dataset.shiny){
          elementImage.src = elementImage.dataset.normal;
          elementImage.title = "Clique para visualizar a versão Shiny"   
        } else {
        elementImage.src = elementImage.dataset.shiny;
        elementImage.title = "Clique para voltar ao normal"
}
})
}

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

