import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { formatDate } from '../modules/formatDate';
import { translateText } from '../modules/translateText';
import { isMobile } from 'react-device-detect';

/**
 * app/.env
 * app/src/components/Apod.jsx
 * @returns ../../.env
 */

const Apod = () => {
    const [state, setState] = useState([]);
    const [isImage, setIsImage] = useState([]);
    const [isYouTube, setIsYouTube] = useState([]);
    const [imgStyle, setImgStyle] = useState({});

    const API_KEY = process.env.REACT_APP_API_KEY;

    const location = useLocation();
    
    useEffect(() => {
        getData();

        async function getData() {
            let date = new URLSearchParams(location.search).get('date');
            if (date === null) date = '';

            const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`); // date=YYYY-MM-DD
            const data = await res.data;
            data.date = formatDate(data.date);
            data.explanation_cat = await translateText(data.explanation);
            setState(data);

            console.log(data.media_type);

            if (data.media_type === 'image') setIsImage(true);
            else {
                setIsImage(false);
                if (data.url.startsWith('https://www.youtube.com/')) setIsYouTube(true);
                else setIsYouTube(false);
            }

            if (isMobile) {
                setImgStyle({ width: '100%', height: 'auto' });
            } else {
                setImgStyle({ width: '60%', height: 'auto' });
            }
        }
    }, []);

    return (
        <div>
            <center>
                <h1>Apod</h1>
                <p>Astronomy Picture of the Day <b>{state.date}</b></p>
                {
                    isImage ? <img className="apod-picture" src={state.url} alt={state.title} style={imgStyle} />
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
            <p style={{ color: '#808080' }}><img className="flagicon" src="https://www.speedrun.com/images/flags/es/ct.png" alt="Catalan" />&nbsp;&nbsp;&nbsp;<i>{state.explanation_cat}</i></p>
            
            <br />
            <br />
            <br />
        </div>
    );
}

export default Apod;
