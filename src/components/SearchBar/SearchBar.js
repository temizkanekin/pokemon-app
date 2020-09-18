import React from 'react';
import { injectIntl } from 'react-intl';
import { localizations } from '../../localization/DefineMessages'

import './SearchBar.css'
const SearchBar = ({searchedText,onChange, className, disabled, intl}) => {
    //todo expand search bar via search icon click (with transition)
    return (
        <input
            disabled={disabled}
            type="text"
            className={`searchbar-root ${className}`}
            id="search-input"
            name="search-input"
            value={searchedText}
            onChange={(e) => onChange(e.target.value)}
            placeholder={intl.formatMessage(localizations.search)}
        />
    )
}

export default injectIntl(SearchBar);