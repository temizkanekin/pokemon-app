import React from 'react';
import Card from '../../components/Card/Card'
import './CapturedPokemonsView.css'
import { withRouter } from "react-router-dom"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

const localizations = defineMessages({
    sortResultsBy: {
        id: "sort.results.by",
    },
    default: {
        id: "default",
    },
    sortByNameAscending: {
        id: "sort.by.name.ascending",
    },
    sortByNameDescending: {
        id: "sort.by.name.descending",
    },
    sortByIdAscending: {
        id: "sort.by.id.ascending",
    },
    sortByIdDescending: {
        id: "sort.by.id.descending",
    },
});

const handleIndex = (number) => {
    if (number < 10)
        return "00" + number
    else if (number < 100)
        return "0" + number
    else
        return number
}

const CapturedPokemonsView = ({ history, pokemonsState, intl }) => {
    const [sortBy, setSortBy] = React.useState("")

    const handleCardClick = (name, index) => (e) => {
        history.push(`/captured-pokemons/${name}/${index}`)
    }

    const handleSort = (array) => {
        if (sortBy === 'name+')
            return array.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        if (sortBy === 'name-')
            return array.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
        else if (sortBy === 'id+' || sortBy === 'default')
            return array.sort((a, b) => a.id - b.id)
        else if (sortBy === 'id-')
            return array.sort((a, b) => b.id - a.id)
        else
            return array
    }

    return (
        <div className="capturedpokemonsview-root">
            <div className="w-full flex justify-evenly p-4">
                <div className="capturedpokemonsview-button flex items-center justify-center">
                    <FontAwesomeIcon className={`mr-2`} icon={faSort} />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="capturedpokemonsview-select" id="sortBy">
                        <option value="" disabled selected>{intl.formatMessage(localizations.sortResultsBy)}</option>
                        <option value="default"> {intl.formatMessage(localizations.default)} </option>
                        <option value="name+"> {intl.formatMessage(localizations.sortByNameAscending)}</option>
                        <option value="name-"> {intl.formatMessage(localizations.sortByNameDescending)}</option>
                        <option value="id+"> {intl.formatMessage(localizations.sortByIdAscending)}</option>
                        <option value="id-"> {intl.formatMessage(localizations.sortByIdDescending)}</option>
                    </select>
                </div>
            </div>
            <div className="captured-content">
                {
                    pokemonsState.capturedPokemons.length > 0 ? handleSort(pokemonsState.capturedPokemons)
                        .sort((a, b) => b.pinned - a.pinned)
                        .map(pokemon => {
                            const index = handleIndex(pokemon.id)
                            return <Card
                                key={pokemon.id}
                                className="m-4"
                                header={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${index}.png`}
                                title={`#${index}`}
                                pinned={pokemon.pinned}
                                subtitle={pokemon.name}
                                onClick={handleCardClick(pokemon.name, index)}
                            />
                        })
                        : <FormattedMessage id="no.captured.pokemon" />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
    }, dispatch)
}

export default withRouter(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CapturedPokemonsView)))