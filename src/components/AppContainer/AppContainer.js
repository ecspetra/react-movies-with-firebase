import FavoriteMoviesList from "../FavoriteMoviesList/FavoriteMoviesList";
import MoviesList from "../MoviesList/MoviesList";

const AppContainer = (props) => {

    return (
        <div className="app-container">
            {props.isLoading && <div>Loading ...</div>}
            <h1>Favorite movies</h1>
            <FavoriteMoviesList myMovies={props.myMovies} selectedMoviePage={props.selectedMoviePage} removeMovieFromMyCollection={props.removeMovieFromMyCollection} onSelectMovie={props.onSelectMovie} />
            <h1>Movies</h1>
            <MoviesList movies={props.movies} addMovieToMyCollection={props.addMovieToMyCollection} />
        </div>
    )
}

export default AppContainer;


