import React from "react";

const MoviePage = (props) => {
    return (
        <div className="movie-page">
            <img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.selectedMoviePage.selectedMovie.data.movie.image} />
            <h3 className="movie-card__title">{props.selectedMoviePage.selectedMovie.data.movie.title}</h3>
            <p className="movie-card__rating">{props.selectedMoviePage.selectedMovie.data.movie.overview}</p>
            <p className="movie-card__rating">{props.selectedMoviePage.selectedMovie.data.movie.vote_average}</p>
            <p className="movie-card__rating">{props.selectedMoviePage.selectedMovie.data.movie.release_date}</p>
        </div>
    )
}

export default MoviePage;