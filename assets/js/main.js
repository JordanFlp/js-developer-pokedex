const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    <div class="shiny">
                        <button class="shiny" data-number="${pokemon.number}" data-photo-shiny="${pokemon.photoShiny}">✨</button>
                    </div>
                    
                </ol>

                <img class="pokePhoto" src="${pokemon.photo}" alt="${pokemon.name}" data-photo-normal="${pokemon.photo}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit);

// ...

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('shiny')) {
        const listItem = event.target.closest('.pokemon');
        if (listItem) {
            const image = listItem.querySelector('.pokePhoto');
            const photoNormal = image.getAttribute('data-photo-normal');
            const photoShiny = event.target.getAttribute('data-photo-shiny');

            if (image.src === photoNormal) {
                // Se a imagem atual é a forma normal, altere-a para a forma brilhante.
                image.src = photoShiny;
            } else {
                // Se a imagem atual é a forma brilhante, volte para a forma normal.
                image.src = photoNormal;
            }
        }
    }
});


// ...

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});
