import React, { useState } from 'react'

export default function CityInput({ city, setCity }) {
    const [cityInput, setCityInput] = useState(city)
    const handleChange = (e) => setCityInput(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        setCity(cityInput)
    }
    const style = {
        top: city ? '-335px' : '-20px',
        width: city ? '300px' : '600px'
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                className='city-input'
                style={style}
                type='text'
                value={cityInput}
                placeholder='Enter a City...'
                onChange={handleChange}
            />
        </form>
    )
}
