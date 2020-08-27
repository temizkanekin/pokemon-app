import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Toolbar from './components/Toolbar/Toolbar'
import PokedexView from './views/Pokedex/PokedexView'
import PokemonDetailView from './views/PokemonDetail/PokemonDetailView'
import CapturedPokemonsView from './views/CapturedPokemons/CapturedPokemonsView'
import {IntlProvider} from "react-intl";
import { connect } from 'react-redux'
import messages_tr from './localization/tr.json'
import messages_en from './localization/en.json'

const messages = {
  'TR': messages_tr,
  'EN': messages_en
};

function App({selectedLanguage}) {
  return (
    <IntlProvider locale='en' messages={messages[selectedLanguage]}>
      <Router>
        <Toolbar />
        <div className="content">
          <Switch>
            <Redirect from="/" to="pokedex" exact />
            <Route path="/" component={PokedexView} exact />
            <Route path="/pokedex" component={PokedexView} exact />
            <Route path="/captured-pokemons" component={CapturedPokemonsView} exact />
            <Route path="/pokedex/:name/:id" component={PokemonDetailView} exact />
            <Route path="/captured-pokemons/:name/:id" component={PokemonDetailView} exact />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    </IntlProvider>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.pokemonsState }
}

export default connect(
  mapStateToProps,
  undefined
)(App);
