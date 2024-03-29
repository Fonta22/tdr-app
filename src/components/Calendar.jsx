import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getThumbnail } from '../modules/getThumbnail.ts';
import { getMonthName, monthNames } from '../modules/getMonthName.ts';
import { daysInMonth } from '../modules/daysInMonth.ts';
import { formatDate } from '../modules/formatDate.ts';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Rolling from '../img/Rolling.svg';
import Globe from '../img/Globe.svg';
import Quote from '../img/Quote.svg'

const Calendar = () => {
    const [images, setImages] = useState([]);
    const [dates, setDates] = useState([]);
    const [year, setYear] = useState('');
    const [staticYear, setStaticYear] = useState('');
    const [monthName, setMonthName] = useState('');
    const [monthNum, setMonthNum] = useState('');
    const [selected, setSelected] = useState('');
    const [path, setPath] = useState(window.location.href.split('/').pop());
    const [submitMsg, setSubmitMsg] = useState('');

    const [inpStyle, setInpStyle] = useState({ width: 500 });
    const [selStyle, setSelStyle] = useState({ width: 400 });

    const [status, setStatus] = useState(<img src={Rolling} style={{ height: 100, marginTop: '1rem' }} />);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const location = useLocation();
    const date = new Date();

    const today = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    //console.log(today, currentMonth);

    const updateMonth = (e) => {
        const select = e.target;
        const value = select.options[select.selectedIndex].value;
        console.log('value: ' + value); // en
        setSelected(value);
        setSubmitMsg('');
    }

    const handleInput = (e) => {
        setYear(e.target.value);
    }

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
            //console.log(year);

            if (month === null) month = currentMonth;
            if (year === null) year = currentYear;

            let days = daysInMonth(month, year);
            let url;

            console.log('currentmonth', currentMonth, 'month', month)
            if (month.toString() === currentMonth.toString() && year.toString() === currentYear.toString()) {
                url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${year}-${month}-01`;
            } else {
                url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${year}-${month}-01&end_date=${year}-${month}-${days}`;
            }

            try {
                const res = await axios.get(url); // date=YYYY-MM-DD
                const data = await res.data;

                const imageArr = [];
                const dateArr = [];

                data.map(e => {
                    console.log(e.url);
                    if (e.media_type === 'image') imageArr.push(e.url);
                    else if (e.media_type === 'other') imageArr.push(Quote); // NO IMAGE!!
                    else if (e.media_type === 'video' && e.url.startsWith('https://www.youtube.com/')) imageArr.push(getThumbnail(e.url));
                    else imageArr.push(Globe); // is website

                    dateArr.push(e.date);
                });

                setStaticYear(year.toString());
                setYear(year);
                setMonthName(getMonthName(month));
                setMonthNum(month);
                setImages(imageArr);
                setDates(dateArr);
                setStatus('');
                setSelected(month);
                console.log(imageArr);
                console.log(dateArr);
                console.log('selected: ' + month);
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
                            <Link to={'/apod?date=' + dates[i]}>
                                <img src={e} alt={i + 1} key={i + 1} title={formatDate(dates[i])} className="resize" style={{ width: 60, height: 60 }} />
                            </Link>
                        );
                    })}
                </div>
                <br />
                <br />
                
                <div className="input-group mb-3" style={inpStyle}>
                    <span className="input-group-text" htmlFor="inputGroupSelect01" style={{ width: 100 }}>Month</span>
                    <select className="form-select" id="inputGroupSelect01" defaultValue="Month" onChange={e => updateMonth(e)} style={selStyle}>
                        <option key="0" value={monthNum}>{monthName}</option>
                        {monthNames.map((month, i) => {
                            if (month !== monthName) {
                                return <option value={i + 1} key={i + 1}>{month}</option>
                            }
                        })}
                    </select>
                </div>

                <div className="input-group mb-3" style={inpStyle}>
                    <span className="input-group-text" id="basic-addon1" style={{ width: 100 }}>Year</span>
                    <input onChange={handleInput} type="number" className="form-control" placeholder="Year" defaultValue={staticYear} aria-label="Year" aria-describedby="basic-addon1" />
                </div>

                <br />
                <button className="btn btn-dark" onClick={() => {
                    if ((selected === '' || selected.toString() === monthNum.toString()) && year.toString() === staticYear.toString()) {
                        if (window.location.href.split('/').pop() !== path) {
                            window.location.replace('/calendar');
                        }
                        else setSubmitMsg('Already selected.');
                    }
                    else {
                        window.location.replace('/calendar?month=' + selected + '&year=' + year);
                    }
                }}>Submit</button>
                <p id="submit-msg">{submitMsg}</p>
            </center>
        </div>
    );
}

export default Calendar;
