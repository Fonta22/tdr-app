import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getThumbnail } from '../modules/getThumbnail.ts';
import { getMonthName, monthNames } from '../modules/getMonthName.ts';
import { daysInMonth } from '../modules/daysInMonth.ts';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Rolling from '../img/Rolling.svg';

const Calendar = () => {
    const [images, setImages] = useState([]);
    const [dates, setDates] = useState([]);
    const [year, setYear] = useState('');
    const [staticYear, setStaticYear] = useState('');
    const [monthName, setMonthName] = useState('');
    const [selected, setSelected] = useState('');

    const [inpStyle, setInpStyle] = useState({ width: 500 });
    const [selStyle, setSelStyle] = useState({ width: 400 });

    const [status, setStatus] = useState(<img src={Rolling} style={{ height: 100, marginTop: '1rem' }} />);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const location = useLocation();
    const date = new Date();

    const today = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    console.log(today, currentMonth);

    const updateMonth = (e) => {
        const select = e.target;
        const value = select.options[select.selectedIndex].value;
        console.log(value); // en
        setSelected(value);
    }

    const handleInput = (e) => {
        setYear(e.target.value);
    }

    /*const replace = (url) => {
        location.replace(url);
    }*/

    useEffect(() => {
        getData();

        async function getData() {
            if (isMobile) {
                setInpStyle({ width: '100%'  });
                setSelStyle({ width: 'auto' });
            } else {
                setInpStyle({ width: 500 });
                setSelStyle({ width: 400 });
            }

            let year = new URLSearchParams(location.search).get('year');
            let month = new URLSearchParams(location.search).get('month');
            console.log(year);

            if (month === null) month = currentMonth;
            if (year === null) year = currentYear;

            let days = daysInMonth(month, year);

            if (month === currentMonth) days = today;

            try {
                const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${year}-${month}-01&end_date=${year}-${month}-${days}`); // date=YYYY-MM-DD
                const data = await res.data;

                const imageArr = [];
                const dateArr = [];

                data.map(e => {
                    if (e.url.startsWith('https://apod.nasa.gov/')) imageArr.push(e.url);
                    else if (e.url.startsWith('https://www.youtube.com/')) imageArr.push(getThumbnail(e.url));

                    dateArr.push(e.date);
                });

                setStaticYear(year.toString());
                setYear(year);
                setMonthName(getMonthName(month));
                setImages(imageArr);
                setDates(dateArr);
                setStatus('');
            } catch (err) {
                setStatus(<code>{err.code}</code>);
            }
        }
    }, []);

    return (
        <div>
            <center>
                <h1>Calendar</h1>
                <p>Calendar from <b>{monthName} {staticYear}</b></p>
                {status}
                <div style={{ width: 300 }}>
                    {images.map((e, i) => {
                        return (
                            <Link to={'/apod?date=' + dates[i]}><img src={e} alt={i + 1} className="resize" style={{ width: 60, height: 60 }}/></Link>
                        );
                    })}
                </div>
                <br />
                <br />
                
                <div className="input-group mb-3" style={inpStyle}>
                    <span className="input-group-text" htmlFor="inputGroupSelect01" style={{ width: 100 }}>Month</span>
                    <select className="form-select" id="inputGroupSelect01" defaultValue="Select Month..." onChange={e => updateMonth(e)} style={selStyle}>
                        <option key="0">Select Month...</option>
                        {monthNames.map((month, i) => {
                            return <option value={i + 1} key={i + 1}>{month}</option>
                        })}
                    </select>
                </div>

                <div className="input-group mb-3" style={inpStyle}>
                    <span className="input-group-text" id="basic-addon1" style={{ width: 100 }}>Year</span>
                    <input onChange={handleInput} type="number" className="form-control" placeholder="Year" aria-label="Year" aria-describedby="basic-addon1" />
                </div>

                <br />
                <button className="btn btn-light" onClick={() => {
                    if (selected === '') window.location.replace('/calendar');
                    else window.location.replace('/calendar?month=' + selected + '&year=' + year);
                }}>Submit</button>
                <br />
                <br />
            </center>
        </div>
    );
}

export default Calendar;
