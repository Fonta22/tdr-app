import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { formatDate } from '../modules/formatDate.ts';
import { translateText } from '../modules/translateText.ts';
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
    const [isVimeo, setIsVimeo] = useState([]);
    const [isWebsite, setIsWebsite] = useState([]);
    const [imgStyle, setImgStyle] = useState({});

    const API_KEY = process.env.REACT_APP_API_KEY;

    const location = useLocation();

    const downloadImage = async (imageSrc) => {
        const image = await fetch(imageSrc, {mode:'cors'})
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = 'eee.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    
    useEffect(() => {
        getData();

        async function getData() {
            let date = new URLSearchParams(location.search).get('date');
            if (date === null) date = '';

            const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`); // date=YYYY-MM-DD
            const data = await res.data;
            
            data.date = formatDate(data.date);
            
            data.explanation = data.explanation.replaceAll('--', '—');
            data.explanation_cat = await translateText(data.explanation);
            
            setState(data);

            console.log(data.media_type);

            if (data.media_type === 'image') setIsImage(true);
            else {
                setIsImage(false);
                if (data.media_type === 'video' && data.url.startsWith('https://www.youtube.com/')) setIsYouTube(true);
                else {
                    setIsYouTube(false);
                    if (data.media_type === 'video' && data.url.startsWith('https://vimeo.com/')) setIsVimeo(true);
                    else {
                        setIsVimeo(false);
                        if (data.media_type === 'other') setIsWebsite(false);
                        else setIsWebsite(true);
                    }
                }
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
                    isImage ? 
                    <img className="apod-picture" src={state.url} alt={state.title} style={imgStyle} />
                    : isYouTube ?
                    <ReactPlayer className="apod-picture" url={state.url} />
                    : isVimeo ?
                    <ReactPlayer className="apod-picture" url={state.url} />
                    : isWebsite ?
                    <p><code>{state.url}</code></p>
                    :
                    <p></p>
                }
                {
                    isImage ?
                    <p>
                        <a href={state.hdurl} onClick={() => {/*downloadImage(state.hdurl)*/}} className="btn btn-outline-primary">Download HD</a>&nbsp;&nbsp;&nbsp;
                        {state.copyright ? '© ' + state.copyright : <i>Public Domain</i>} {new Date().getFullYear()}
                    </p>
                    : isYouTube ?
                    <p>
                        <a href={state.url} className="btn btn-outline-danger"><i class="bi bi-youtube" />&nbsp;&nbsp;View in YouTube</a>&nbsp;&nbsp;&nbsp;
                        {state.copyright ? '© ' + state.copyright : <i>Public Domain</i>} {new Date().getFullYear()}
                    </p>
                    : isVimeo ?
                    <p>
                        <a href={state.url} className="btn btn-outline-info"><i class="bi bi-vimeo" />&nbsp;&nbsp;View in Vimeo</a>&nbsp;&nbsp;&nbsp;
                        {state.copyright ? '© ' + state.copyright : <i>Public Domain</i>} {new Date().getFullYear()}
                    </p>
                    : isWebsite ?
                    <p>
                        <a href={state.url} className="btn btn-outline-primary"><i class="bi bi-globe2"></i>&nbsp;&nbsp;View webpage</a>&nbsp;&nbsp;&nbsp;
                        {state.copyright ? '© ' + state.copyright : <i>Public Domain</i>} {new Date().getFullYear()}
                    </p>
                    :
                    <p></p>
                }
                <br />
            </center>
            
            <h2>{state.title}</h2>
            <p align="justify">{state.explanation}</p>
            <p align="justify" className="explanation-cat">
                <img className="flagicon" src="https://www.speedrun.com/images/flags/es/ct.png" alt="Catalan" />&nbsp;&nbsp;
                <i>{state.explanation_cat}</i>
            </p>
        </div>
    );
}

export default Apod;
