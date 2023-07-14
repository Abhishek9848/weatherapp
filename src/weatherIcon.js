import sunnyDay from './images/icons/01d.svg'
import clearNight from './images/icons/01n.svg'
import cloudyDay from './images/icons/02d.svg'
import cloudyNight from './images/icons/02n.svg'
import overcastDay from './images/icons/03d.svg'
import overcastNight from './images/icons/03n.svg'
import cloudy from './images/icons/04d.svg'
import drizzle from './images/icons/09d.svg'
import rain from './images/icons/10d.svg'
import thunderWithRain from './images/icons/11d.svg'
import snow from './images/icons/13d.svg'
import mist from './images/icons/50d.svg'

export default function icon(name){
    switch(name){
        case "01d": return sunnyDay;
        case "01n": return clearNight;
        case "02d": return cloudyDay;
        case "02n": return cloudyNight;
        case "03d": return overcastDay;
        case "03n": return overcastNight;
        case "04d": return cloudy;
        case "04n": return cloudy;
        case "09d": return drizzle;
        case "09n": return drizzle;
        case "10d": return rain;
        case "10n": return rain;
        case "11d": return thunderWithRain;
        case "11n": return thunderWithRain;
        case "13d": return snow;
        case "13n": return snow;
        case "50d": return mist;
        case "50n": return mist;
        default:
            return sunnyDay
    }
}