const pokemonList = document.createElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 25
const offset = 0
const maxRecords = 151

function convertListToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol id ="pokemonList" class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>
                <img src=${pokemon.photo}
                alt="${pokemon.name}">
            </div>
        </li>
`
}




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertListToHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMoreButton(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset = + limit
    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - maxRecords
        loadPokemonItens(offset, limit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }

})