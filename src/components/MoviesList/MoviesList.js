import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = (props) => {
    return (
        <div>
            {props.movies.map((movie, index) => {
                return <MovieCard movie={movie} key={index} addMovieToMyCollection={props.addMovieToMyCollection} />
            })
            }
        </div>
    )
}

export default MoviesList;