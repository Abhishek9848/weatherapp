import './styles.css'
import CityInput from './CityInput';
import WeatherBox from './WeatherBox';
import geticon from '../weatherIcon'

export default function MainWeatherWindow({ data, setCity }) {
    console.log(" -->>", data)
    const Title = data && data.city ? null : <h1 className='title'>Weather Forecast</h1>;
    const imagePath = data ? geticon(data?.days[0].weather[0].icon) : geticon()
    return (
        <div className='main'>
            <div className='inner-main'>
                {Title}
                <img
                    src={imagePath}
                    alt='sun'
                    style={{
                        visibility: data ? 'visible' : 'hidden',
                        opacity: data ? '1' : '0'
                    }}
                />

                <div
                    className='today'
                    style={{
                        visibility: data ? 'visible' : 'hidden',
                        opacity: data ? '1' : '0'
                    }}
                >
                    <h1>{data?.city.name}</h1>
                    <p>Temperature: {data ? Math.round(data.days[0].main.temp - 273.15) : 0} °C </p>
                    <p>
                        Range: {data ? Math.round(data.days[0].main.temp_min - 273.15) : 0} °C -
                        {data ? Math.round(data.days[0].main.temp_max - 273.15) : 0} °C
                    </p>
                    <p>{data ? data.days[0].weather[0].description.toUpperCase() : ''}</p>
                </div>
            </div>
            <CityInput city={data?.city.name} setCity={setCity} />
            <ul className='weather-box-list'>{
                data?.days.slice(1).map(day => (
                    <li>
                        <WeatherBox date={day.dt_txt} icon={day.weather[0].icon} temp={day.main.temp} />
                    </li>
                ))

            }</ul>

        </div>
    )
}
