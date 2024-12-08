const pokeApi = {}

// Definindo a classe Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height / 10; // Convertendo para metros
    pokemon.weight = pokeDetail.weight / 10; // Convertendo para quilogramas

    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => translateAbility(abilitySlot.ability.name));

    // Novos atributos traduzidos para exibição
    pokemon.baseExperience = pokeDetail.base_experience;
    pokemon.stats = pokeDetail.stats.map((stat) => ({
        name: translateStat(stat.stat.name),
        value: stat.base_stat,
    }));
    pokemon.moves = pokeDetail.moves.map((moveSlot) => translateMove(moveSlot.move.name));

    return pokemon;
}

// Função para traduzir nomes de atributos
function translateStat(statName) {
    const translations = {
        hp: "Pontos de Vida (HP)",
        attack: "Ataque",
        defense: "Defesa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defesa Especial",
        speed: "Velocidade",
    };
    return translations[statName] || statName;
}

// Função para traduzir habilidades
function translateAbility(abilityName) {
    const translations = {
        overgrow: "Supercrescimento",
        chlorophyll: "Clorofila",
        blaze: "Labareda",
        torrent: "Torrente",
        // Adicione mais habilidades conforme necessário
    };
    return translations[abilityName] || abilityName;
}

// Função para traduzir movimentos
function translateMove(moveName) {
    const translations = {
        "swords-dance": "Dança das Espadas",
        cut: "Corte", bind: "Amarrar",
        "vine-whip": "Chicote de Vinhas",
        headbutt: "Cabeçada", tackle: "Investida",
        "body-slam": "Soco Corporal", "take-down": "Arremetida",
        "double-edge": "Duplo Impacto", growl: "Rosnado", 
        "string-shot": "Disparo de Seda", snore: "Roncar", 
        "bug-bite": "Picada de Inseto", electroweb: "Eletro Rede", 
        "tail-whip": "Chicote de Cauda", bite: "Mordida", 
        roar: "Rugido", "poison-sting": "Ferrão Venenoso",
        leer: "Olhar Mal", wrap: "Enrolar", gust: "Rajada",
        "wing-attack": "Ataque de Asa", "whirlwind": "Redemoinho",
        fly: "Voar", "razor-wind": "Vento Navalha", "take-down": "Arremetida",
        "double-edge": "Duplo Impacto", "wing-attack": "Ataque de Asa",
        "agility": "Agilidade", "mirror-move": "Movimento Espelho",
        "mist": "Névoa", "focus-energy": "Foco de Energia",
        "hyper-beam": "Hiper Raio", "pay-day": "Dia de Pagar",
        "substitute": "Substituto", "rest": "Descansar",
        "rock-slide": "Deslizamento de Pedras", "tri-attack": "Tri Ataque",
        "super-fang": "Super Presa", "screech": "Agudo",
        "double-team": "Time Duplo", "recover": "Recuperar",
        "mega-punch": "Mega Soco", "fire-punch": "Soco de Fogo",
        "|thunder-punch": "Soco de Trovão", "scratch": "Arranhão",
        "mega-kick": "Mega Chute", "headbutt": "Cabeçada",
        "thunder-punch": "Soco de Trovão", ember: "Brasa",
        flamethrower: "Lança-Chamas", "ice-punch": "Soco de Gelo",
        // Adicione mais movimentos conforme necessário
    };
    return translations[moveName] || moveName;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests));
};
