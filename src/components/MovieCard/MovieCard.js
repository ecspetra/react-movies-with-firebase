import React from 'react';

const MovieCard = (props) => {
    return (
        <div className="movie-card">
            <a href="/">
                <div className="movie-card__content">
                    <img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.poster_path} />
                    <h3 className="movie-card__title">{props.movie.title}</h3>
                    <p className="movie-card__rating">{props.movie.vote_average}</p>
                </div>
            </a>
            <button className="movie-card__button" onClick={() => {
                props.addMovieToMyCollection(props.movie)
            }}>Add to my movies</button>
        </div>
    )
}

export default MovieCard;