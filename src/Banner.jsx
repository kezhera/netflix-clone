import React , { useState , useEffect } from 'react';
import axios from './axios';
import request from './request';
import './Banner.css'
function Banner() {
    
    const [movie , setMovie] = useState([])
    
    useEffect( () => {
        async function fetchData() {
            const requests = await axios.get(request.fetchNetflixOriginals);
            console.log(requests)
            setMovie(
                requests.data.results[
                    Math.floor(Math.random() * requests.data.results.length - 1)
                ]
            );
            return requests;
        }
        fetchData();
    } , [] ); 

    function trucate(str , n){
        return str?.length > n ? str.substr(0 , n) + "..." : str ;
    }

    return (
        <div 
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage : `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    { movie?.title || movie?.name || movie?.original_name }
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <p className="banner__description">
                    {trucate(movie?.overview , 150)}
                </p>
            </div>
            
            <div className="banner__fadeBottom" />
        </div>
    )
}

export default Banner
