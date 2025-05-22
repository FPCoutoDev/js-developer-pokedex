    const pokeApi = {}

    
    function convertPokemonApiDetailToPokemon(pokeDetail){
        const pokemon = new Pokemon()
        pokemon.number = pokeDetail.id;
        pokemon.name = pokeDetail.name;

        const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types;

        pokemon.types = types;
        pokemon.type = type;

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

        return pokemon
    }

        pokeApi.getPokemonDetail = async (pokemon) => {
            try {
                return convertPokemonApiDetailToPokemon(
                    await (await fetch(pokemon.url)).json()
                );
            } catch (error) {
                console.error(`Erro na tentativa de leitura do URL:`, error);
            }
        };
    pokeApi.getPokemons = async (offset = 0, limit = 16) => { 
        try {
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
            return await Promise.all(await(await fetch(url))).results
            .then((response) => response.json())  
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => {
                console.log(pokemonsDetails)
                return pokemonsDetails
            })
        } catch (error) {
                console.error(`Erro na tentativa de leitura do URL:`, error);
            }}