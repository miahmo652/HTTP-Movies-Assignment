import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: [""]
};

export default function UpdateForm(props) {

    const [movie, setMovie]=useState(initialItem);
    const { id } = useParams();
    

    const HandleChange = e =>{
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        });
    };

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res=> {
            res.data={
                ...res.data,
                stars: res.data.stars.toString()
            }
                setMovie(res.data)
        })
        .catch(err => console.log(err))
    }, [id])

    const handleSubmit = e =>{
        movie.stars=movie.stars.split(',')
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            props.getMovieList();
            console.log(res)
            setMovie({
                id: "",
                title: "",
                director: "",
                metascore: "",
                stars: []
            })
        })
        .catch(err =>console.log(err))
    }
    return(
        <div>
<form onSubmit={handleSubmit}>
    <label htmlFor="title">Title:
    <input 
    type="text"
    name="title"
    value={movie.title}
    onChange={HandleChange}

    
    />
    
    </label>
    <label htmlFor="director">Director
    <input 
    type="text"
    name="director"
    value={movie.director}
    onChange={HandleChange}
    />
    
    </label>
    <label htmlFor="metascrore">Metascore:
    <input
    type="text"
    name="metascore"
    value={movie.metascore}
    onChange={HandleChange}
    
    
    />
    
    </label>
    <label htmlFor="stars">Stars:
    <input 
    type="text"
    name="stars"
    onChange={HandleChange}
    value={movie.stars}
    />
    </label>

    <button type ='submit'>Update</button>
</form>
        </div>
    )
}
