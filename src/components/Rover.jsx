import React, { useState, useEffect } from "react";
import axios from 'axios';
import { formatDate } from '../modules/formatDate.ts';
import { isMobile } from "react-device-detect";

import cameraOff from '../img/camera-off.png';
import white from '../img/white.png';
import black from '../img/black.png';

const Rover = () => {
    const background = white;
    
    const [sol, setSol] = useState(100);

    // Cams
    const [FHAZ, setFHAZ] = useState(background);
    const [RHAZ, setRHAZ] = useState(background);
    const [MAST, setMAST] = useState(background);
    const [CHEMCAM, setCHEMCAM] = useState(background);
    const [MAHLI, setMAHLI] = useState(background);
    const [MARDI, setMARDI] = useState(background);
    const [NAVCAM, setNAVCAM] = useState(background);
    
    const [earthDate, setEarthDate] = useState('');

    const API_KEY = process.env.REACT_APP_API_KEY;
    // search bar
    // setSol(115);


    const getUrl = (sol, key) =>
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${key}&sol=${sol}`;

    async function getCam(target, photos) {
        let arr = [];

        photos.map(i => {
            if (i.camera.name === target) arr.push(i);
        });

        if (arr.length === 0) return cameraOff;
        else return arr[0].img_src;
    }


    async function getData(sole) {
        const url = getUrl(sole, API_KEY);

        const res = await axios.get(url);
        const data = res.data;

        const photos = data.photos;
        const photo_count = photos.length;

        console.log(`Found ${photo_count} images`);
        // console.log(photos);

        // setCaption(`This images were taken by the Curiosity NASA Rover in Mars the day ${photos[0].earth_date}, Sol ${sole}.`);
        setEarthDate(formatDate(photos[0].earth_date));

        //// SET CAMS ////

        const fh = await getCam("FHAZ", photos);
        setFHAZ(fh);

        const rh = await getCam("RHAZ", photos);
        setRHAZ(rh);

        const ms = await getCam("MAST", photos);
        setMAST(ms);

        const cc = await getCam("CHEMCAM", photos);
        setCHEMCAM(cc);

        const mh = await getCam("MAHLI", photos);
        setMAHLI(mh);

        const md = await getCam("MARDI", photos);
        setMARDI(md);

        const nv = await getCam("NAVCAM", photos);
        setNAVCAM(nv);
    }

    useEffect(() => {
        getData(sol);
    }, []);

    if (!isMobile) {
        return (
            <div>
                <center>
                    <h1>Rover</h1>
                    <br />
                    <form onSubmit={ev => {
                        ev.preventDefault();
                        const value = ev.target.search.value;

                        if (value === '') return;
                        setSol(value);
                        getData(value);
                    }}>
                        {/*<button id="arrow-left"></button>*/}
                        <input className="form-control" type="number" placeholder="Sol" name="search" defaultValue={sol} autoComplete="off" />
                        <button className="btn btn-outline-secondary" type="submit">Submit</button>
                        {/*<button id="arrow-right"></button>*/}
                    </form>
                </center>
                <br />
                <center>
                {/*<div className="hover-content">
                    <h2>Sol</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere veniam quibusdam earum impedit officiis eum error sequi natus aliquam perferendis accusamus numquam totam vitae, dolore rerum praesentium distinctio repellendus consequuntur?</p>
                </div>*/}
                <h2 style={{ marginTop: 20 }}>Photos from <span title="One sol is a day in Mars." className="hover-text">sol</span> <code>{sol}</code>{/*<img src="https://cdn-icons-png.flaticon.com/512/447/447144.png" style={{ height: 25 }} alt="" />*/}</h2>
                <p style={{ marginBottom: 20 }}>This images were taken by the <b>Curiosity</b> Rover in Mars the day <b>{earthDate}</b>, Sol <b>{sol}</b>.</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={FHAZ} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> FHAZ</b>
                                        <p className="card-text">Front Hazard Avoidance Camera</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={RHAZ} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> RHAZ</b>
                                        <p className="card-text">Rear Hazard Avoidance Camera</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={MAST} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> MAST</b>
                                        <p className="card-text">Mast Camera</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={CHEMCAM} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> CHEMCAM</b>
                                        <p className="card-text">Chemestry and Camera Complex</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={MAHLI} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> MAHLI</b>
                                        <p className="card-text">Mars Hand Lens Imager</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={MARDI} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> MARDI</b>
                                        <p className="card-text">Mars Descent Imager</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td />
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={NAVCAM} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> NAVCAM</b>
                                        <p className="card-text">Navigation Camera</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </center>
            </div>
        );
    } else {
        return (
            <div>
                <center>
                    <h1>Rover</h1>
                    <br />
                    <form onSubmit={ev => {
                        ev.preventDefault();
                        const value = ev.target.search.value;

                        if (value === '') return;
                        setSol(value);
                        getData(value);
                    }}>
                        {/*<button id="arrow-left"></button>*/}
                        <input className="form-control" type="number" placeholder="Sol" name="search" defaultValue={sol} autoComplete="off" />
                        <br />
                        <button className="btn btn-outline-secondary" type="submit" style={{ marginTop: 1 + 'rem' }}>Submit</button>
                        {/*<button id="arrow-right"></button>*/}
                    </form>
                </center>
                <br />
                <center>
                {/*<div className="hover-content">
                    <h2>Sol</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere veniam quibusdam earum impedit officiis eum error sequi natus aliquam perferendis accusamus numquam totam vitae, dolore rerum praesentium distinctio repellendus consequuntur?</p>
                </div>*/}
                <h2 style={{ marginTop: 20 }}>Photos from <span title="One sol is a day in Mars." className="hover-text">sol</span> <code>{sol}</code>{/*<img src="https://cdn-icons-png.flaticon.com/512/447/447144.png" style={{ height: 25 }} alt="" />*/}</h2>
                <p style={{ marginBottom: 20 }}>This images were taken by the <b>Curiosity</b> Rover in Mars the day <b>{earthDate}</b>, Sol <b>{sol}</b>.</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={FHAZ} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> FHAZ</b>
                                        <p className="card-text">Front Hazard Avoidance Camera</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={RHAZ} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> RHAZ</b>
                                        <p className="card-text">Rear Hazard Avoidance Camera</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={MAST} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> MAST</b>
                                        <p className="card-text">Mast Camera</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={CHEMCAM} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> CHEMCAM</b>
                                        <p className="card-text">Chemestry and Camera Complex</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={MAHLI} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> MAHLI</b>
                                        <p className="card-text">Mars Hand Lens Imager</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={MARDI} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> MARDI</b>
                                        <p className="card-text">Mars Descent Imager</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card" >
                                    <img className="card-img-top" id="rover-cam-img" src={NAVCAM} alt="Card image cap" />
                                    <div className="card-body">
                                        <b className="card-text"><i className="bi bi-camera-fill"></i> NAVCAM</b>
                                        <p className="card-text">Navigation Camera</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </center>
            </div>
        );
    }
}

export default Rover;
