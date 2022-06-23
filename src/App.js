import MovieCard from './components/MovieCard/MovieCard';
import {useState, useEffect} from "react";
import database from './firebase';

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

  useEffect(() => {getMovies()}, []);

  const postMoviesToDataBase = (selectedMovie) => {
      database.ref("movies").set({
          ...myMovies,
          movie: {
              title: selectedMovie.title,
              description: selectedMovie.overview,
              date: selectedMovie.release_date,
          },
      }).catch(alert);
  }

  const addMovieToMyCollection = (selectedMovie) => {
      console.log(myMovies);
      console.log(selectedMovie);
      if (!myMovies.includes(selectedMovie)) {
          setMyMovies([...myMovies, selectedMovie]);
          postMoviesToDataBase(selectedMovie);
      } else {
          alert('You already have this movie');
      }

  }

  return (
    <div className="App">
        {myMovies && myMovies.map((movie, key) => {
            return <div key={key}>{movie.title}</div>
        })
        }
        -------------------------------------------------------------------
      {movies.map((movie, key) => {
          return <MovieCard movie={movie} key={key} addMovieToMyCollection={addMovieToMyCollection} />
        })
      }
    </div>
  );
}

export default App;
