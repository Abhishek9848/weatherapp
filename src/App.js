import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainWeatherWindow from './components/MainWeatherWindow';
import { FadeLoader } from 'react-spinners';
import useDate from './components/date';

const getWeatherInfo = async (city, setLoading) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
  const { data } = await axios.get(url)
  if (data) {
    console.log("inhere -->", data)
    let dayIndices = [];
    dayIndices.push(data.list[0]);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(data.list[index]);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return { days: dayIndices, city: data.city }
  }
  setLoading(false)
}

function App() {
  const [city, setCity] = useState()
  const [weatherInfo, setWeatherInfo] = useState()
  const [loading, setLoading] = useState(false)
  const { date, time, wish } = useDate();

  useEffect(() => {
    const call = async () => {
      setLoading(true)
      const result = await getWeatherInfo(city, setLoading)
      setWeatherInfo(result)
      setLoading(false)
    }
    if (city) {
      call()
    }
  }, [city])
  console.log("war --", weatherInfo)
  return (
    <div className="App">
      {loading && <div className='loader'><FadeLoader color='blue' /></div>}
      <div className='App-header'>
        <div className='dateTime'>
          <div>{wish}</div>
          <div>{date} {time}</div>
        </div>
        <MainWeatherWindow
          data={weatherInfo}
          setCity={setCity}
        />
      </div>
    </div>
  );
}

export default App;
