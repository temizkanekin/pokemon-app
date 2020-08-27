const initialState = {
    selectedLanguage: "EN",
    capturedPokemons:[]
}

const pokemonsState = (state=initialState, action) => {
    switch(action.type) {
        case 'CAPTURE_POKEMON':
            state.capturedPokemons.push(action.payload)
            return {
                ...state
            }
        case 'RELEASE_POKEMON':
            state.capturedPokemons.splice(state.capturedPokemons.indexOf(action.payload),1)
            return {
                ...state
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
        case 'SET_SELECTED_LANGUAGE':
            return {
                ...state,
                selectedLanguage: action.payload
            }
        default:
            return state
    }
}

export default pokemonsState