const initialState = {
    capturedPokemons:[]
}

const pokemonsState = (state=initialState, action) => {
    switch(action.type) {
        case 'CAPTURE_POKEMON':
            return {
                capturedPokemons : state.capturedPokemons.push(action.payload),
                ...state
            }
        case 'RELEASE_POKEMON':
            return {
                capturedPokemons : state.capturedPokemons.splice(state.capturedPokemons.indexOf(action.payload),1),
                ...state,
            }
        case 'UPDATE_POKEMON_DETAIL':
            let updatedCapturedPokemons = state.capturedPokemons
            updatedCapturedPokemons.length > 0 && updatedCapturedPokemons.forEach((pokemon,index) => {
                if(pokemon.name === action.payload.name) 
                    updatedCapturedPokemons[index] = action.payload
            })
            return {
                ...state,
                capturedPokemons: updatedCapturedPokemons
            }
        default:
            return state
    }
}

export default pokemonsState