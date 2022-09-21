import React, { useState, useEffect } from 'react';
import { getThumb } from '../modules/getThumbnail';
import { getMonthName, monthNames } from '../modules/getMonthName';
import { daysInMonth } from '../modules/daysInMonth';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Calendar = () => {
    const [images, setImages] = useState([]);
    const [dates, setDates] = useState([]);
    const [year, setYear] = useState('');
    const [staticYear, setStaticYear] = useState('');
    const [monthName, setMonthName] = useState('');
    const [selected, setSelected] = useState('');

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
            let year = new URLSearchParams(location.search).get('year');
            //const month = 10;
            let month = new URLSearchParams(location.search).get('month');
            console.log(year);

            if (month === null) month = currentMonth;
            if (year === null) year = currentYear;

            let days = daysInMonth(month, year);

            if (month === currentMonth) days = today;

            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${year}-${month}-01&end_date=${year}-${month}-${days}`); // date=YYYY-MM-DD
            const data = await res.json();

            const imageArr = [];
            const dateArr = [];

            data.map(e => {
                if (e.url.startsWith('https://apod.nasa.gov/')) imageArr.push(e.url);
                else if (e.url.startsWith('https://www.youtube.com/')) imageArr.push(getThumb(e.url));

                dateArr.push(e.date);
            });

            setStaticYear(year.toString());
            setYear(year);
            setMonthName(getMonthName(month));
            setImages(imageArr);
            setDates(dateArr);
        }
    }, []);

    return (
        <div>
            <center>
                <h1>Calendar</h1>
                <p>Calendar from <b>{monthName} {staticYear}</b></p>
                <div style={/*{ marginLeft: 450, marginRight: 450 }*/ { width: 300 }}>
                    {images.map((e, i) => {
                        return (
                            <Link to={'/apod?date=' + dates[i]}><img src={e} alt={i + 1} className="resize" style={{ width: 60, height: 60 }}/></Link>
                        );
                    })}
                </div>
                <br />
                <br />
                
                <div class="input-group mb-3" style={{ width: 500 }}>
                    <label class="input-group-text" for="inputGroupSelect01" style={{ width: 100 }}>Month</label>
                    <select class="form-select" id="inputGroupSelect01" onChange={e => updateMonth(e)} style={{ width: 400 }}>
                        <option selected>Select Month...</option>
                        {/*monthNames.map((name, num) => {
                            console.log(name, num + 1);
                            <option value={num + 1}>{name}</option>
                        })*/}
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>

                <div class="input-group mb-3" style={{ width: 500 }}>
                    <span class="input-group-text" id="basic-addon1" style={{ width: 100 }}>Year</span>
                    <input onChange={handleInput} type="text" class="form-control" placeholder="Year" aria-label="Year" aria-describedby="basic-addon1" />
                </div>

                <br />
                <button className="btn btn-light" onClick={() => {
                    if (selected === '') window.location.replace('/calendar');
                    else window.location.replace('/calendar?month=' + selected + '&year=' + year);
                }}>Submit</button>

                {/*<div class="input-group mb-3" style={{ width: 500 }}>
                    <span class="input-group-text" id="basic-addon1">Year&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" class="form-control" placeholder="Year" />
                </div>*/}

            </center>
        </div>
    );
}

export default Calendar;
