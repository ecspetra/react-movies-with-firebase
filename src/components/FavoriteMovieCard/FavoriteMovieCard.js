import React from "react";

const FavoriteMovieCard = (props) => {
    return (
        <div>
            <img src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.data.movie.image} />
            <p>{props.movie.data.movie.title}</p>
            <p>{props.movie.data.movie.rating}</p>
            <button onClick={() => {props.removeMovieFromMyCollection(props.movie.key)}}>Remove from my movies</button>
        </div>
    )
}

export default FavoriteMovieCard;