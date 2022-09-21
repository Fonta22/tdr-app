import React, { useState, useEffect } from "react";
import axios from 'axios';

const Epic = () => {
    const [image, setImage] = useState([]);
    const [times, setTimes] = useState([]);
    const [date, setDate] = useState('');
    const [tds_, setTds] = useState([]);
    //const [index, setIndex] = useState(0);

    const url = 'https://epic.gsfc.nasa.gov/api/natural';

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

        console.log(images);
        console.log(times);

        setImage(images[0].image);
        
        //setImages(images);
        //setTimes(times);
        //setDate(date);

        /*const finalData = {
            images: images,
            times: times,
            date: date,
            caption: caption
        }*/

        //setState(finalData);
        //console.log(finalData);
    }

    /*const spin = () => {
        if (index >= state.images.length - 1) return setIndex(0)
        setIndex(index + 1)
        console.log(state, index);
    }*/

    useEffect(() => {
        //console.log('d')
        getData();
        //setIndex(0);
        //console.log(state);
    }, []);

    //getData();

    //if (!images) return <pre>Images not loaded</pre>

    const tds = [];

    /*for (let i = 0; i <= 2; i++) {
        tds.push(
            <td>
                <div className="card" >
                    <img className="card-img-top" id="rover-cam-img" src={images[i].image} alt="Card image cap" />
                    <div className="card-body">
                        <b className="card-text"><i class="bi bi-camera-fill"></i> {images[i].time}</b>
                        <p className="card-text">{images[i].coords.lat}, {images[i].coords.lon}</p>
                    </div>
                </div>
            </td>
        )
        console.log(tds);
        setTds(tds);
    }*/

    return (
        <div>
            <center>
                <h1>Epic</h1>
                <p>Earth Polychromatic Imaging Camera <b>{date}</b></p>
                <img className="apod-picture" src={image} alt="img" />
                {/*<table>
                <tbody>
                    <tr>
                        tds_[0]
                        <td>
                            <div className="card" >
                                <img className="card-img-top" id="rover-cam-img" src={images[0].image} alt="Card image cap" />
                                <div className="card-body">
                                    <b className="card-text"><i class="bi bi-camera-fill"></i> {images[0].time}</b>
                                    <p className="card-text">{images[0].coords.lat}, {images[0].coords.lon}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="card" >
                                <img className="card-img-top" id="rover-cam-img" src={images[1].image} alt="Card image cap" />
                                <div className="card-body">
                                    <b className="card-text"><i class="bi bi-camera-fill"></i> {images[1].time}</b>
                                    <p className="card-text">{images[1].coords.lat}, {images[1].coords.lon}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="card" >
                                <img className="card-img-top" id="rover-cam-img" src={images[2].image} alt="Card image cap" />
                                <div className="card-body">
                                    <b className="card-text"><i class="bi bi-camera-fill"></i> {images[2].time}</b>
                                    <p className="card-text">{images[2].coords.lat}, {images[2].coords.lon}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                </table>*/}
            </center>
        </div>
    );
    
    /*return (
        <div>
            <center>
                <h1>Epic</h1>
                <p>Earth Polychromatic Imaging Camera <b>{state.date}</b></p>
                <img className="epic-picture" src={state.images[index]} alt="ee" />
                <br /><span>{index + 1}/{state.images.length}</span>
                <br /><button className="btn btn-dark" onClick={spin}>spin</button>
            </center>
        </div>
    );*/
}

export default Epic;
