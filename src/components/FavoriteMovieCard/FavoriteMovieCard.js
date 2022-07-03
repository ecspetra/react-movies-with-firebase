import React from "react";
import {Link} from "react-router-dom";

const FavoriteMovieCard = (props) => {
    return (
        <div className="favorite-movie-card">
            <div>
                <Link to="/movie" className="favorite-movie-card__content" onClick={() => {
                    props.onSelectMovie(props.movie)}}>
                    <img className="favorite-movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.data.movie.image} />
                    <h3 className="favorite-movie-card__title">{props.movie.data.movie.title}</h3>
                    <p className="favorite-movie-card__rating">{props.movie.data.movie.rating}</p>
                </Link>
                <button className="favorite-movie-card__button" onClick={() => {props.removeMovieFromMyCollection(props.movie.key)}}>Remove from my movies</button>
            </div>
        </div>
    )
}

export default FavoriteMovieCard;