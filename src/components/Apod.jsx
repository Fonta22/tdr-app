import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { formatDate } from '../modules/formatDate';
import { translateText } from '../modules/translateText';

/**
 * app/.env
 * app/src/components/Apod.jsx
 * @returns ../../.env
 */

const Apod = () => {
    const [state, setState] = useState([]);
    const [isImage, setIsImage] = useState([]);
    const [isYouTube, setIsYouTube] = useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const location = useLocation();
    
    useEffect(() => {
        getData();

        async function getData() {
            let date = new URLSearchParams(location.search).get('date');
            if (date === null) date = '';

            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`); // date=YYYY-MM-DD
            const data = await res.json();
            data.date = formatDate(data.date);
            data.explanation_cat = await translateText(data.explanation);
            setState(data);

            if (data.url.startsWith('https://apod.nasa.gov/')) setIsImage(true);
            else if (data.url.startsWith('https://www.youtube.com/')) {
                setIsImage(false); setIsYouTube(true);
            } else {
                setIsImage(false); setIsYouTube(false);
            }
                /*setIsYouTube(true);
            } else if (data.url.startsWith('https://www.youtube.com/'))*/
        }
    }, []);

    return (
        <div>
            <center>
                <h1>Apod</h1>
                <p>Astronomic Picture of the Day <b>{state.date}</b></p>
                {
                    isImage ? <img className="apod-picture" src={state.url} alt={state.title} />
                    : <ReactPlayer className="apod-picture" url={state.url} />
                }
                {
                    isImage ? <p><a href={state.hdurl} className="btn btn-outline-primary">Download HD</a>&nbsp;&nbsp;&nbsp;&copy; {state.copyright || 'NASA'} 2022</p>
                    : isYouTube ? <p><a href={state.url} className="btn btn-outline-primary">View in YouTube</a>&nbsp;&nbsp;&nbsp;&copy; {state.copyright || 'NASA'} 2022</p>
                    : <p><a href={state.url} className="btn btn-outline-primary">View in Vimeo</a>&nbsp;&nbsp;&nbsp;&copy; {state.copyright || 'NASA'} 2022</p>
                }
            </center>
            
            <h2>{state.title}</h2>
            
            <p>{state.explanation}</p>
            <p style={{ color: '#808080' }}><img class="flagicon" src="https://www.speedrun.com/images/flags/es/ct.png" alt="Catalan" />&nbsp;&nbsp;&nbsp;<i>{state.explanation_cat}</i></p>
            
            <br />
            <br />
            <br />
        </div>
    );
}

export default Apod;
