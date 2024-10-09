let offset = 0;
let limit = 10;
let maxRecords = 1000;
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonList = document.getElementById('pokemonList');

function convertListToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol id ="pokemonList" class="types">
                    ${pokemon.types.map((type) => `<li class="type${type}">${type}</li>`).join('')}
                </ol>
                <img src=${pokemon.photo}
                    alt="${pokemon.name}">
            </div>
        </li>
`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertListToHtml).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset += limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - maxRecords;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});