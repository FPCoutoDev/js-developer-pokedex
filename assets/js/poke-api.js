    const pokeApi = {}

    
    function convertPokemonApiDetailToPokemon(pokeDetail){
        const pokemon = new Pokemon()
        pokemon.number = pokeDetail.id;
        pokemon.name = pokeDetail.name;

        const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types;

        pokemon.types = types;
        pokemon.type = type;
        pokemon.shinyPhoto = pokeDetail.sprites.other["official-artwork"].front_shiny;
        pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;


        return pokemon
    }

        pokeApi.getPokemonDetail = async (pokemon) => {
            try {
                const response = await fetch(pokemon.url);
                const jsonBody = await response.json();
                return convertPokemonApiDetailToPokemon(jsonBody);
            } catch (error) {
                console.error(`Erro na tentativa de leitura do URL:`, error);
            }
        };

        pokeApi.getPokemons = async (offset = 0, limit = 16) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;

        return Promise.all(
            pokemons.map(async  (pokemon) => {
                const data = await pokeApi.getPokemonDetail(pokemon)
                console.log(data)
                return data
            })
            
        );
    } catch (error) {
        console.error("Erro na hora de extrair dados da API:", error);
    }
};
