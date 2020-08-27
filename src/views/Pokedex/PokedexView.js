import React from 'react';
import axios from "axios";
import Card from '../../components/Card/Card'
import './PokedexView.css'
import { withRouter } from "react-router-dom"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faSort } from '@fortawesome/free-solid-svg-icons'
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

const PokedexView = ({ history, intl }) => {
    const [pokemons, setPokemons] = React.useState([])
    const [sortBy, setSortBy] = React.useState("")
    const [offset, setOffset] = React.useState(0)

    function usePrevious(value) {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevCount = usePrevious(offset)

    React.useEffect(() => {
        if (offset !== prevCount) {
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
                .then(res => setPokemons([...pokemons, ...res.data.results]))
        }
    }, [offset, prevCount, pokemons])

    const handleScroll = (e) => {
        let element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            setOffset(offset + 100)
        }
    }

    const handleCardClick = (name, index) => (e) => {
        history.push(`/pokedex/${name}/${index}`)
    }

    const handleSurpriseButtonClick = () => {
        let randomPokemonIndex = Math.floor(Math.random() * pokemons.length);
        history.push(`/pokedex/${pokemons[randomPokemonIndex].name}/${handleIndex(randomPokemonIndex)}`)
    }

    const handleSort = (array) => {
        if (sortBy === 'name+')
            return array.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        if (sortBy === 'name-')
            return array.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
        else if (sortBy === 'id+' || sortBy === 'default')
            return array.sort((a, b) => a.url.match(/\d+/g)[1] - b.url.match(/\d+/g)[1])
        else if (sortBy === 'id-')
            return array.sort((a, b) => b.url.match(/\d+/g)[1] - a.url.match(/\d+/g)[1])
        else
            return array
    }

    return (
        <div onScroll={handleScroll} className="pokedexview-root">
            <div className="w-full flex justify-evenly p-4">
                <button disabled={!pokemons} onClick={handleSurpriseButtonClick} className="pokedexview-button" type="button">
                    <FontAwesomeIcon className={`mr-2`} icon={faSyncAlt} />
                    <FormattedMessage id="surprise.me" />
                </button>
                <div className="pokedexview-button flex items-center justify-center">
                    <FontAwesomeIcon className={`mr-2`} icon={faSort} />
                    <select disabled={!pokemons} value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="pokedexview-select" id="sortBy">
                        <option value="" disabled selected>{intl.formatMessage(localizations.sortResultsBy)}</option>
                        <option value="default"> {intl.formatMessage(localizations.default)} </option>
                        <option value="name+"> {intl.formatMessage(localizations.sortByNameAscending)}</option>
                        <option value="name-"> {intl.formatMessage(localizations.sortByNameDescending)}</option>
                        <option value="id+"> {intl.formatMessage(localizations.sortByIdAscending)}</option>
                        <option value="id-"> {intl.formatMessage(localizations.sortByIdDescending)}</option>
                    </select>
                </div>
            </div>
            {
                pokemons.length > 0 ? handleSort(pokemons)
                    .map((pokemon, i) => {
                        const index = handleIndex(pokemon.url.match(/\d+/g)[1])
                        return <Card
                            key={index}
                            className="m-4"
                            header={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${index}.png`}
                            title={`#${index}`}
                            subtitle={pokemon.name}
                            onClick={handleCardClick(pokemon.name, index)}
                        />
                    })
                    : <FormattedMessage id="no.pokemons" />
            }
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
)(PokedexView)))