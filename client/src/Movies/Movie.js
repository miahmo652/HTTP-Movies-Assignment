import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(addToSavedList) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
const deleteItem = e =>{
  e.preventDefault()
  axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
  .then(()=>{
    props.getMovieList();
    history.push('/')
  })
  
  
  .catch(err =>console.log(err))
}
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button>
        <Link to={`/update-movie/${params.id}`}> Update</Link>
      </button>
      <button onClick={deleteItem}>Delete</button>
      

      
    </div>
  );
}

export default Movie;
