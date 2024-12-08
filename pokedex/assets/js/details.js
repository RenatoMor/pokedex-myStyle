const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const pokemonDetails = document.getElementById('pokemonDetails');

pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` })
    .then((pokemon) => {
        pokemonDetails.innerHTML = `
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">${pokemon.types.map((type) => 
                    `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

            </div>
            <div class="extra-details">
                <p class="height">Altura: ${pokemon.height / 10} m</p>
                <p class="weight">Peso: ${pokemon.weight / 10} kg</p>
                <p class="abilities">Habilidades: ${pokemon.abilities.join(', ')}</p>
                <p class="base-experience">Base de Experiência: ${pokemon.baseExperience}</p>
                <div class="stats">
                    <h3>Status:</h3>
                    <ul>
                        ${pokemon.stats.map((stat) => `<li>${stat.name}: ${stat.value}</li>`).join('')}
                    </ul>
                </div>
                <div class="moves">
                    <h3>Movimentos:</h3>
                    <ul>
                        ${pokemon.moves.slice(0, 10).map((move) => `<li>${move}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    
