import React from 'react'
import defaulticon from '../images/static/cloudy.svg'

export default function WeatherBox({ date, icon, temp }) {
    const getDay = date => {
        let weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';

        return weekday[new Date(date).getDay()];
    };
    return (
        <div className='weather-box'>
            <h1>{date ? getDay(date) : ''}</h1>
            <img
                src={
                    defaulticon
                }
                alt='sun'
            />
            <span className='temp'>{Math.round(temp - 273.15)}°C</span>
        </div>
    )
}
