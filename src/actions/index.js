export const capturePokemon = (pokemon) => {
    return {
        type: 'CAPTURE_POKEMON',
        payload: {
            ...pokemon,
            pinned: false
        }
    }
}

export const releasePokemon = (pokemon) => {
    return {
        type: 'RELEASE_POKEMON',
        payload: pokemon
    }
}

export const updatePokemonDetail = (pokemon) => {
    return {
        type: 'UPDATE_POKEMON_DETAIL',
        payload: pokemon
    }
}