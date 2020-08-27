import React from 'react';
import axios from "axios";
import { withRouter } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Lottie from "react-lottie";
import { FormattedMessage } from 'react-intl';
import './PokemonDetailView.css'

const pokemonLogoData = require("../../assets/4366-game-east-west.json");

const options = {
    loop: false,
    autoplay: true,
    animationData: pokemonLogoData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const PokemonDetailView = ({ history, match, capturePokemon, releasePokemon, updatePokemonDetail, pokemonsState }) => {
    const logo = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${match.params.id}.png`
    const [pokemonDetail, setPokemonDetail] = React.useState(undefined)
    const [openDialog, setOpenDialog] = React.useState(false)

    const pokemonName = match.params.name
    const isCapture = match.path.includes("pokedex")
    React.useEffect(() => {
        isCapture ? axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(res => setPokemonDetail(res.data))
            :
            setPokemonDetail(pokemonsState.capturedPokemons.filter(pokemon => pokemon.name === pokemonName)[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleCapturePokemon = () => {
        if (isCapture) {
            capturePokemon(pokemonDetail)
            setOpenDialog(true)
        }
        else {
            releasePokemon(pokemonDetail)
            history.push('/captured-pokemons')
        }
    }

    React.useEffect(() => {
        pokemonDetail && updatePokemonDetail(pokemonDetail)
    }, [pokemonDetail, updatePokemonDetail])

    return (
        <div className="pokemon-detail-root">
            <div className="flex">
                <div className="w-full flex">
                    <div className="pokemon-detail-image m-auto">
                        {<img className="pokemon-detail-logo" alt="Logo" src={logo} />}
                    </div>
                </div>
                <div className="w-full flex flex-col ml-4 mt-4">
                    <div className="pokemon-detail-info">{pokemonName}</div>
                    <div className="flex mb-4 text-lg font-medium">
                        <FormattedMessage id="abilities" />
                    </div>
                    <div className="flex mb-4 text-lg pokemon-detail-abilities">
                        {
                            pokemonDetail && pokemonDetail.abilities.map(a =>
                                <div key={a.ability.name} className="mr-2">
                                    {
                                        a.ability.name
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className="flex mb-4 text-lg font-medium">
                        <FormattedMessage id="type" />
                    </div>
                    <div className="flex mb-4 flex-wrap">
                        {
                            pokemonDetail && pokemonDetail.types.map(t =>
                                <div key={t.type.name} className={`pokemon-detail-type ${t.type.name}`}>
                                    {
                                        t.type.name
                                    }
                                </div>
                            )
                        }
                    </div>
                    {
                        !isCapture && pokemonDetail && <button
                            type="button"
                            onClick={() => setPokemonDetail({ ...pokemonDetail, pinned: !pokemonDetail.pinned })}
                            className="pokemon-detail-user-buttons"
                        >
                            {
                                pokemonDetail.pinned ?
                                    <FontAwesomeIcon className={`mr-2`} icon={faHeartSolid} size="lg" /> :
                                    <FontAwesomeIcon className={`mr-2`} icon={faHeart} size="lg" />
                            }
                            {
                                pokemonDetail.pinned ? <FormattedMessage id="pokemon.added.to.favorites" /> : <FormattedMessage id="pokemon.add.to.favorites" />
                            }
                        </button>
                    }
                    <button onClick={handleCapturePokemon} className={`mb-4 pokemon-detail-capture-button ${!isCapture ? "pokemon-detail-release-button" : ""}`}>
                        {isCapture ? <FormattedMessage id="capture.the.pokemon" /> : <FormattedMessage id="release.the.pokemon" />}</button>
                </div>
            </div>
            <div className="overflow-auto">
                <div className="pokemon-detail-about-title">
                    <FormattedMessage id="about.the.pokemon" />
                </div>
                <div className="w-full mt-4 h-full">
                    {
                        pokemonDetail && pokemonDetail.stats.map(s => {
                            return <div className="w-full mb-2 flex justify-between items-center">
                                <span className="w-1/5">{s.stat.name}</span>
                                <div className="w-4/5 flex">
                                    <span className="bg-gray-400 flex justify-end" style={{ width: `${s.base_stat}%` }}>%{s.base_stat}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            {openDialog && <div className="pokemon-detail-dialog-outer">
                <dialog open={openDialog} className="pokemon-detail-dialog">
                    <Lottie width='75%' options={options} />
                    <span className="font-bold mb-4"><FormattedMessage id="pokemon.captured" /></span>
                    <div className="flex justify-end pb-4">
                        <button onClick={() => setOpenDialog(false)} className="text-white pokemon-detail-dialog-button" type="button"><FormattedMessage id="confirm" /></button>
                    </div>
                </dialog>
            </div>}
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
        capturePokemon: Actions.capturePokemon,
        releasePokemon: Actions.releasePokemon,
        updatePokemonDetail: Actions.updatePokemonDetail
    }, dispatch)
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PokemonDetailView));