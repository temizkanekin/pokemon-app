import { combineReducers } from 'redux'
import pokemonsState from './pokemons'
const pokemonApp = combineReducers({
    pokemonsState
})
export default pokemonApp;