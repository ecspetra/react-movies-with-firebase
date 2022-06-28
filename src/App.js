import MovieCard from './components/MovieCard/MovieCard';
import {useState, useEffect} from "react";
import database from './firebase';
import FavoriteMoviesList from "./components/FavoriteMoviesList/FavoriteMoviesList";
import MoviesList from "./components/MoviesList/MoviesList";

function App() {

  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
          console.log(movies);
        });
  }

    const postMoviesToDataBase = (selectedMovie) => {
        database.ref("movies").push({
            movie: {
                image: 'https://image.tmdb.org/t/p/w440_and_h660_face' + selectedMovie.poster_path,
                title: selectedMovie.title,
                id: selectedMovie.id,
                rating: selectedMovie.vote_average,
            },
        }).catch(alert);
    }

    const removeMovieFromMyCollection = (key) => {
        database.ref("movies").child(key).remove();
        console.log(key);
        getMyMovies();
    }

    const getMyMovies = () => {
        database.ref("movies").once('value', (snapshot) => {
            setMyMovies([]);
            snapshot.forEach((childSnapshot) => {

                const newMovie = {
                    key: childSnapshot.key,
                    data: childSnapshot.val(),
                }

                setMyMovies(prevState => ([...prevState, newMovie]));
            });
            console.log(myMovies);
        });
    }

  useEffect(() => {
      getMovies();
      console.log(myMovies);
      getMyMovies();
  }, []);

  const addMovieToMyCollection = (selectedMovie) => {
      if (!myMovies.length) {
          postMoviesToDataBase(selectedMovie);
          getMyMovies();
          console.log(myMovies);
      } else {
          if (myMovies.find(movie => selectedMovie.id === movie.data.movie.id)) {
              alert('You already have this movie');
          } else {
              postMoviesToDataBase(selectedMovie);
              getMyMovies();
          }
      }
  }

  return (
    <div className="App">
        <button onClick={() => {getMyMovies()}}>Get my movies</button>
        <FavoriteMoviesList myMovies={myMovies} removeMovieFromMyCollection={removeMovieFromMyCollection} />
        -------------------------------------------------------------------
        <MoviesList movies={movies} addMovieToMyCollection={addMovieToMyCollection} />
    </div>
  );
}

export default App;
