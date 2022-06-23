import React from 'react';

const MovieCard = (props) => {
    return (
        <div>
            <h2>{props.movie.title}</h2>
            <p>{props.movie.overview}</p>
            <p>{props.movie.release_date}</p>
            <button onClick={() => {
                props.addMovieToMyCollection(props.movie)
            }}>Add to my movies</button>
        </div>
    )
}

export default MovieCard;