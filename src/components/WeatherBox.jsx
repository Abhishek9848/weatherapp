import React from 'react'
import useDate from './date';
import geticon from '../weatherIcon';
export default function WeatherBox({ date, icon, temp }) {
    const { d, m } = useDate(date);
    const imagePath = icon ? geticon(icon) : geticon()
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
            <h1>{date ? `${d} ${m}` : ''}</h1>
            <p>{date ? getDay(date) : ''}</p>
            <img
                src={imagePath}
                alt='sun'
            />
            <span className='temp'>{Math.round(temp - 273.15)}°C</span>
        </div>
    )
}
