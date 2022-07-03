import {useState, useEffect} from "react";
import database from './firebase';
import { Routes, Route } from "react-router-dom";
import AppContainer from "./components/AppContainer/AppContainer";
import MoviePage from "./components/MoviePage/MoviePage";

function App() {

  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMoviePage, setSelectedMoviePage] = useState([]);

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
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
            setIsLoading(true);
            snapshot.forEach((childSnapshot) => {

                const newMovie = {
                    key: childSnapshot.key,
                    data: childSnapshot.val(),
                }

                setMyMovies(prevState => ([...prevState, newMovie]));
            });
            setIsLoading(false);
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

  const onSelectMovie = (selectedMovie) => {
      const selected_movie = movies.find(movie => selectedMovie.data.movie.id === movie.id);
      setSelectedMoviePage(selected_movie);
  }

  return (
      <Routes>
          <Route path="/" element={<AppContainer movies={movies} myMovies={myMovies} selectedMoviePage={selectedMoviePage} removeMovieFromMyCollection={removeMovieFromMyCollection} addMovieToMyCollection={addMovieToMyCollection} isLoading={isLoading} onSelectMovie={onSelectMovie} />} />
          <Route path="movie" element={<MoviePage movies={movies} myMovies={myMovies} selectedMoviePage={selectedMoviePage} />} />
      </Routes>
  );
}

export default App;
