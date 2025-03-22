import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainWeatherWindow from './components/MainWeatherWindow';
import { FadeLoader } from 'react-spinners';
import useDate from './components/date';

function getFilteredDates(data) {
  const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const now = Math.floor(new Date(date).getTime() / 1000);
  // Find the closest entry to the current time
  let closestEntry = data.reduce((prev, curr) =>
    Math.abs(curr.dt - now) < Math.abs(prev.dt - now) ? curr : prev
  );

  // Extract unique dates with "09:00:00" timestamps
  let uniqueDates = {};
  data.forEach(item => {
    let [date, time] = item.dt_txt.split(" ");
    if (!uniqueDates[date] && time === "09:00:00") {
      uniqueDates[date] = item;
    }
  });

  // Convert to array and ensure the closest entry is first
  let result = [closestEntry, ...Object.values(uniqueDates)];

  // Remove duplicate closest entry if it has "09:00:00"
  result = result.filter((item, index, self) =>
    index === 0 || item.dt !== closestEntry.dt
  );

  return result.slice(0, 5);
}


const getWeatherInfo = async (city, setLoading) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
  const { data } = await axios.get(url)
  if (data) {
    return { days: getFilteredDates(data.list), city: data.city }
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
