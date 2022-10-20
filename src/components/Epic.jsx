import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getMapURL } from '../modules/getMapURL.ts';
import { formatDate } from '../modules/formatDate.ts';
import { isMobile } from "react-device-detect";

const Epic = () => {
    const [image, setImage] = useState([]);
    const [images, setImages] = useState([]);
    const [time, setTime] = useState('Loading');
    const [date, setDate] = useState('');
    const [coords, setCoords] = useState({});

    const API_KEY = process.env.REACT_APP_API_KEY;

    const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${API_KEY}`;

    const getData = async () => {
        const res = await axios.get(url);
        const data = await res.data;

        const caption = data[0].caption;
        const date = data[0].date.split(' ')[0];
        const date_formatted = date.replaceAll('-', '/');

        let times = [];
        let images = [];

        for (let i = 0; i < data.length; i++) {
            let time = data[i].date.split(' ')[1];
            let coords = data[i].centroid_coordinates;
            let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${data[i].image}.png`;

            console.log(coords);
            times.push(time);
            images.push({
                image: image,
                time: time,
                coords: coords
            });
        }

        setDate(formatDate(date));
        setImages(images);

        setImage(images[0].image);
        setTime(times[0]);
        setCoords([ images[0].coords.lat, images[0].coords.lon ]);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <center>
                <h1>Epic</h1>
                <p>Earth Polychromatic Imaging Camera <b>{date}</b></p>
                {
                    isMobile ? <img src={image} alt="img" className="epic-img-mobile" />
                    : <img src={image} alt="img" className="epic-img-desktop" />
                }
                <div className="epic-data">
                    <p>
                        <b>{time}</b>
                        <br />
                        <code>{coords[0]}, {coords[1]}</code>
                    </p>
                    <button title="Click to see the location in Google Maps" className="btn btn-secondary" onClick={() => window.location.href = getMapURL(coords[0], coords[1], 3)}><i className="bi bi-box-arrow-up-right" />&nbsp;&nbsp;Google Maps</button>
                </div>

                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Image</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{e.time}</th>
                                    <td><code>{e.coords.lat}</code></td>
                                    <td><code>{e.coords.lon}</code></td>
                                    <td><img src={e.image} alt={i} className="epic-img-table" /></td>
                                    <td><button className="btn btn-primary" onClick={() => {
                                        setImage(e.image);
                                        setTime(e.time);
                                        setCoords([ e.coords.lat, e.coords.lon ])
                                        console.log(images[i].image);
                                        document.body.scrollIntoView();
                                    }}>View</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Epic;
