import React from "react";

const MoviePage = (props) => {
    return (
        <div className="movie-page">
            <img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.selectedMoviePage.poster_path} />
            <h3 className="movie-card__title">{props.selectedMoviePage.title}</h3>
            <p className="movie-card__rating">{props.selectedMoviePage.overview}</p>
            <p className="movie-card__rating">{props.selectedMoviePage.vote_average}</p>
            <p className="movie-card__rating">{props.selectedMoviePage.release_date}</p>
        </div>
    )
}

export default MoviePage;