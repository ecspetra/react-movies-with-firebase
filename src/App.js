import MovieCard from './components/MovieCard/MovieCard';
import {useState, useEffect} from "react";
import database from './firebase';
import FavoriteMovieCard from "./components/FavoriteMovieCard/FavoriteMovieCard";

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
                console.log(newMovie);
            });
            console.log(myMovies);
        });
    }

  useEffect(() => {getMovies(); getMyMovies();}, []);

  const addMovieToMyCollection = (selectedMovie) => {
      if (!myMovies.includes(selectedMovie)) {
          //setMyMovies([...myMovies, selectedMovie]);
          postMoviesToDataBase(selectedMovie);
          getMyMovies();
      } else {
          alert('You already have this movie');
      }
  }

  return (
    <div className="App">
        <button onClick={() => {getMyMovies()}}>Get my movies</button>
        {myMovies && myMovies.map((movie, index) => {
            return <FavoriteMovieCard movie={movie} key={index} removeMovieFromMyCollection={removeMovieFromMyCollection} />
        })
        }
        -------------------------------------------------------------------
      {movies.map((movie, index) => {
          return <MovieCard movie={movie} key={index} keyID={index} addMovieToMyCollection={addMovieToMyCollection} />
        })
      }
    </div>
  );
}

export default App;
