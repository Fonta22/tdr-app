import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getThumbnail } from '../modules/getThumbnail.ts';
import { isMobile } from "react-device-detect";

const Home = () => {
    const [apod, setApod] = useState('');
    const [calendarImg, setCalendarImg] = useState('');
    const [epicImg, setEpicImg] = useState('');

    const API_KEY = process.env.REACT_APP_API_KEY;

    const getApodImg = async () => {
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        const data = await res.data;

        if (data.media_type === 'image') setApod(data.url);
        else if (data.media_type === 'video' && data.url.startsWith('https://www.youtube.com/')) setApod(getThumbnail(data.url));
    }
    
    const getEpicImg = async () => {
        const response = await axios.get(`https://epic.gsfc.nasa.gov/api/natural?api_key=${API_KEY}`);
        const data = await response.data;

        const date = data[0].date.split(' ')[0].replaceAll('-', '/');
        const image = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${data[0].image}.png`;
        setEpicImg(image);
    }
    
    const getCalendarImg = async () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        let currentMonth = date.getMonth() + 1;

        if (currentMonth < 10) currentMonth = `0${currentMonth}`;
        else currentMonth = currentMonth.toString();

        const fullDate = `${currentYear}-${currentMonth}-01`;

        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fullDate}`);
        const data = await res.data;

        if (data.media_type === 'image') setCalendarImg(data.url)
        else if (data.media_type === 'video' && data.url.startsWith('https://www.youtube.com/')) setCalendarImg(getThumbnail(data.url));
    }

    useEffect(() => {
        console.log('yus iFEKT!!');
        getApodImg();
        getCalendarImg();
        getEpicImg();
    }, []);

    if (!isMobile) {
        return (
            <div>
                <center>
                    <h1>Home</h1>
                    <br />
                    <table className="home-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="card">
                                        <Link to="/apod"><img src={apod} className="card-img-top" alt="Apod" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Apod</h5>
                                            <p className="card-text">Astronomy Picture of the Day</p>
                                            <Link to="/apod" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="card">
                                    <Link to="/epic"><img src={epicImg} className="card-img-top" alt="Epic" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Epic</h5>
                                            <p className="card-text">Earth Polychromatic Imaging Camera</p>
                                            <Link to="/epic" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="card">
                                    <Link to="/rover"><img src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00122/opgs/edr/fcam/FRA_408331341EDR_F0050938FHAZ00304M_.JPG" className="card-img-top" alt="Rover" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Rover</h5>
                                            <p className="card-text">Image data gathered by NASA's Curiosity rover on Mars</p>
                                            <Link to="/rover" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="card">
                                        <Link to="/calendar"><img src={calendarImg} className="card-img-top" alt="Calendar" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Calendar</h5>
                                            <p className="card-text">Calendar of all the Astronomic Pictures of the Day, with links to the Apod page.</p>
                                            <Link to="/calendar" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                    {/*
                                        https://apod.nasa.gov/apod/image/2209/TulipCygX-1_1024.jpg
                                        https://apod.nasa.gov/apod/image/2205/ngc346_hst_b1024.jpg
                                        https://apod.nasa.gov/apod/image/2205/LagoonCenter_HubbleOzsarac_960.jpg
                                        https://apod.nasa.gov/apod/image/2205/NGC3521LRGBHaAPOD-20_1024.jpg
                                    */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/about" className="btn btn-outline-dark">About this website</Link>
                </center>
            </div>
        );
    } else {
        return (
            <div>
                <center>
                    <h1>Home</h1>
                    <br />
                    <table className="home-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="card">
                                        <Link to="/apod"><img src={apod} className="card-img-top" alt="Apod" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Apod</h5>
                                            <p className="card-text">Astronomic Picture of the Day</p>
                                            <Link to="/apod" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="card">
                                        <Link to="/epic"><img src="https://camo.githubusercontent.com/aab3b35653d7f6ca27f08b9db5839aeaa651897a2cbf9c2a464ce01c15e4d315/68747470733a2f2f657069632e677366632e6e6173612e676f762f617263686976652f6e61747572616c2f323032322f30332f31382f706e672f657069635f31625f32303232303331383032313531342e706e67" className="card-img-top" alt="Epic" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Epic</h5>
                                            <p className="card-text">Earth Polychromatic Imaging Camera</p>
                                            <Link to="/epic" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="card">
                                        <Link to="/rover"><img src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00122/opgs/edr/fcam/FRA_408331341EDR_F0050938FHAZ00304M_.JPG" className="card-img-top" alt="Rover" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Rover</h5>
                                            <p className="card-text">Image data gathered by NASA's Curiosity rover on Mars</p>
                                            <Link to="/rover" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="card">
                                        <Link to="/calendar"><img src={calendarImg} className="card-img-top" alt="Calendar" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">Calendar</h5>
                                            <p className="card-text">Calendar of all the Astronomic Pictures of the Day, with links to the Apod page.</p>
                                            <Link to="/calendar" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/about" className="btn btn-outline-dark">About this website</Link>
                </center>
            </div>
        );
    }
}

export default Home;
