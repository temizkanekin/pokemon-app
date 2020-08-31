import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import './Card.css'
const Card = ({ ...props }) => {
    const { className, header, title, subtitle, description, pinned, key, onClick } = props
    return (
        <div className={`card ${className}`} key={key}>
            <div onClick={onClick} className="card-image-div">
                {
                    <img className="card-image" alt="Card" src={header} />
                }
            </div>
            <div className="card-body">
                <div className="card-title">
                    {title}
                    {typeof pinned !== "undefined" ? pinned ? <FontAwesomeIcon className={`mr-2`} icon={faHeartSolid} size="lg" /> :
                        <FontAwesomeIcon className={`mr-2`} icon={faHeart} size="lg" />
                        : null
                    }
                </div>
                <div onClick={onClick} className="card-subtitle">
                    {subtitle}
                </div>
                {
                    !!description &&
                    <div className="card-description">
                        {description}
                    </div>
                }
            </div>
        </div>
    )
}

export default Card;