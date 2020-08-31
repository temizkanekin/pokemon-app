import React from 'react';
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from 'react-intl';
import './Toolbar.css'

const languages = ["EN", "TR"]

const Toolbar = ({ history, pokemonsState, ...props }) => {
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "EN"

    const handleLanguageSelection = (e) => {
        localStorage.setItem("selectedLanguage", e.target.value)
        history.go(0)
    }
    
    return (
        <div className="toolbar-root">
            <ul className="toolbar-content">
                <li onClick={() => history.push('/')} className="ml-8 mr-2 cursor-pointer"><FontAwesomeIcon className={`mr-2`} icon={faHome} size="lg" /></li>
                <li onClick={() => history.push('/pokedex')} className={`toolbar-button ${props.location.pathname.includes("pokedex") && "toolbar-button-active"}`}>
                    <FormattedMessage id="pokedex" />
                </li>
                <li onClick={() => history.push('/captured-pokemons')} className={`toolbar-button ${props.location.pathname.includes("captured-pokemons") && "toolbar-button-active"}`}>
                    <FormattedMessage id="captured.pokemons" />
                </li>
            </ul>
            <div className="toolbar-language-selector">
                <div className="toolbar-language-selector-inline">
                    <select
                        className="toolbar-select"
                        value={selectedLanguage}
                        onChange={handleLanguageSelection}
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

export default withRouter(connect(
    mapStateToProps,
    undefined
)(Toolbar));