const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.number.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url).then((response) => response.json()).then((pokemon) => {

        })))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            debugger
            console.log(pokemonsDetails)
        })
}
