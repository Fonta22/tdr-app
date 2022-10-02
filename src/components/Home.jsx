import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getThumb } from '../modules/getThumbnail';
import { isMobile } from "react-device-detect";

const Home = () => {
    const [apod, setApod] = useState("https://th.bing.com/th/id/R.2eb1c28e60e9f2648d1d0105b4059c09?rik=ZvX666QnPjiUvw&riu=http%3a%2f%2ftlap.com%2fwp-content%2fuploads%2f2011%2f05%2fblack-1024x576.png&ehk=YJs4rpnHZOCJGbOI1Z1t6AmmFFrJmHRlCg3bU3VLPrk%3d&risl=&pid=ImgRaw&r=0");
    const [calendarImg, setCalendarImg] = useState();

    const API_KEY = process.env.REACT_APP_API_KEY;

    const getApod = async () => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        const data = await res.json();

        if (data.url.startsWith('https://apod.nasa.gov/')) setApod(data.url);
        else if (data.url.startsWith('https://www.youtube.com/')) setApod(getThumb(data.url));
    }

    const getCalendarImg = async () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        let currentMonth = date.getMonth() + 1;

        if (currentMonth < 10) currentMonth = `0${currentMonth}`;
        else currentMonth = currentMonth.toString();

        const fullDate = `${currentYear}-${currentMonth}-01`;

        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fullDate}`);
        const data = await res.json();
        setCalendarImg(data.url);
    }

    useEffect(() => {
        console.log('yus iFEKT!!');
        getApod();
        getCalendarImg();
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
                                        <img src={apod} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Apod</h5>
                                            <p className="card-text">Astronomic Picture of the Day</p>
                                            <Link to="/apod" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="card">
                                        <img src="https://camo.githubusercontent.com/aab3b35653d7f6ca27f08b9db5839aeaa651897a2cbf9c2a464ce01c15e4d315/68747470733a2f2f657069632e677366632e6e6173612e676f762f617263686976652f6e61747572616c2f323032322f30332f31382f706e672f657069635f31625f32303232303331383032313531342e706e67" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Epic</h5>
                                            <p className="card-text">Earth Polychromatic Imaging Camera</p>
                                            <Link to="/epic" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="card">
                                        <img src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00122/opgs/edr/fcam/FRA_408331341EDR_F0050938FHAZ00304M_.JPG" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Rover</h5>
                                            <p className="card-text">Image data gathered by NASA's Curiosity rover on Mars</p>
                                            <Link to="/rover" className="btn btn-primary">Visit</Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="card">
                                        <img src={calendarImg} className="card-img-top" alt="..." />
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
                </center>
                <br />
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
                                        <img src={apod} className="card-img-top" alt="..." />
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
                                        <img src="https://camo.githubusercontent.com/aab3b35653d7f6ca27f08b9db5839aeaa651897a2cbf9c2a464ce01c15e4d315/68747470733a2f2f657069632e677366632e6e6173612e676f762f617263686976652f6e61747572616c2f323032322f30332f31382f706e672f657069635f31625f32303232303331383032313531342e706e67" className="card-img-top" alt="..." />
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
                                        <img src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00122/opgs/edr/fcam/FRA_408331341EDR_F0050938FHAZ00304M_.JPG" className="card-img-top" alt="..." />
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
                                        <img src={calendarImg} className="card-img-top" alt="..." />
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
                </center>
                <br />
            </div>
        );
    }
}

export default Home;
