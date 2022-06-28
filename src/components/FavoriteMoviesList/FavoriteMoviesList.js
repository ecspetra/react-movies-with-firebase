import React from "react";
import FavoriteMovieCard from "../FavoriteMovieCard/FavoriteMovieCard";

const FavoriteMoviesList = (props) => {
    return (
        <div className="favorite-movies-list">
            {props.myMovies && props.myMovies.map((movie, index) => {
                return <FavoriteMovieCard movie={movie} key={index} removeMovieFromMyCollection={props.removeMovieFromMyCollection} />
            })}
        </div>
    )
}

export default FavoriteMoviesList;