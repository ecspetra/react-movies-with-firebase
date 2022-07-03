import React from "react";
import FavoriteMovieCard from "../FavoriteMovieCard/FavoriteMovieCard";

const FavoriteMoviesList = (props) => {
    return (
        <div className="favorite-movies-list">
            {props.myMovies && props.myMovies.map((movie, index) => {
                return <FavoriteMovieCard movie={movie} key={index} selectedMoviePage={props.selectedMoviePage} removeMovieFromMyCollection={props.removeMovieFromMyCollection} onSelectMovie={props.onSelectMovie} />
            })}
        </div>
    )
}

export default FavoriteMoviesList;