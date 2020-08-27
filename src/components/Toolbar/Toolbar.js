import React from 'react';
import { withRouter } from "react-router-dom"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from 'react-intl';
import './Toolbar.css'

const languages = ["EN", "TR"]

const Toolbar = ({ history, pokemonsState, setSelectedLanguage, ...props }) => {
    const { selectedLanguage } = pokemonsState
    return (
        <div className="toolbar-root">
            <ul className="toolbar-content">
                <li onClick={() => history.push('/')} className="mx-2 cursor-pointer"><FontAwesomeIcon className={`mr-2`} icon={faHome} size="lg" /></li>
                <li onClick={() => history.push('/pokedex')} className={`toolbar-button ${props.location.pathname.includes("pokedex") && "toolbar-button-active"}`}>
                    <FormattedMessage id="pokedex" />
                </li>
                <li onClick={() => history.push('/captured-pokemons')} className={`toolbar-button ${props.location.pathname.includes("captured-pokemons") && "toolbar-button-active"}`}>
                    <FormattedMessage id="captured.pokemons" />
                </li>
            </ul>
            <div className="toolbar-language-selector">
                <div className="toolbar-language-selector-inline">
                    <label className="pr-1 toolbar-label" htmlFor="languages">
                        <FormattedMessage id="toolbar.language" />
                    </label>
                    <select
                        className="toolbar-select"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        id="languages"
                    >
                        {
                            languages.map(language =>
                                <option key={language} value={language}>{language}</option>
                            )
                        }
                    </select>
                </div>
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
        setSelectedLanguage: Actions.setSelectedLanguage
    }, dispatch)
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar));