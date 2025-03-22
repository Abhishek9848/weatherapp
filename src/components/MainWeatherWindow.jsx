import './styles.css'
import CityInput from './CityInput';
import WeatherBox from './WeatherBox';
import geticon from '../weatherIcon'

export default function MainWeatherWindow({ data, setCity }) {
    const Title = data && data.city ? null : <h1 className='title'>Weather Forecast</h1>;
    const imagePath = data ? geticon(data?.days[0].weather[0].icon) : geticon();
    const temp = data ? Math.round(data.days[0].main.temp - 273.15) : 0;
    const tempMin = data ? Math.round(data.days[0].main.temp_min - 273.15) : 0;
    const tempMax = data ? Math.round(data.days[0].main.temp_max - 273.15) : 0;
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
                    <p>Temperature: {temp} °C </p>
                    <p>
                        Range: {tempMin} °C - {tempMax} °C
                    </p>
                    <p>{data ? data.days[0].weather[0].description.toUpperCase() : ''}</p>
                </div>
            </div>
            <CityInput city={data?.city?.name || ""} setCity={setCity} />
            <ul className='weather-box-list'>{
                data?.days.slice(1).map((day, i) => (
                    <li key={i}>
                        <WeatherBox date={day.dt_txt} icon={day.weather[0].icon} temp={day.main.temp} />
                    </li>
                ))

            }</ul>

        </div>
    )
}
