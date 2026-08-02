import { useEffect,useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import image from './assets/img_5.jpg'
import './App.css'
import { WiDayCloudy } from "react-icons/wi";
import { CiSearch } from "react-icons/ci";
import { IoIosPartlySunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { WiDayWindy } from "react-icons/wi";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { BsCloudLightningRainFill } from "react-icons/bs";
import { FaRegSnowflake } from "react-icons/fa6";
import { RiMistFill } from "react-icons/ri";


const App = () => {
  
  const allIcons ={
    "01d": IoIosPartlySunny,
    "01n": IoIosPartlySunny,
    "02d": WiDayCloudy,
    "02n": WiDayCloudy,
    "03d": WiDayCloudy,
    "03n": WiDayCloudy,
    "04d": BsCloudDrizzleFill ,
    "04n": BsCloudDrizzleFill ,
    "09d": BsCloudLightningRainFill,
    "09n": BsCloudLightningRainFill ,
    "10d": BsCloudLightningRainFill,
    "10n": BsCloudLightningRainFill,
    "13d": FaRegSnowflake,
    "13n": FaRegSnowflake,
    "50d": RiMistFill,
    "50n": RiMistFill,
   
  }
  const search = async (city)=> {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || IoIosPartlySunny;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
    } catch (error) {

    }
  }

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef()
  const WeatherIcon = weatherData?.icon;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city){
      alert('entrez une ville')
      return;
    }
    search(city);
  }

  useEffect(()=> {
    search("")
  }, []);
  return (
    <>
      <div
        className='min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed '
        style={{ backgroundImage: `url(${image})` }}
       >
        <div
          className='w-[500px] h-[700px] bg-white/20 shadow-lg rounded-2xl backdrop-blur-sm'
         >
          <div className='flex gap-3 justify-center items-center p-5'>
            <WiDayCloudy className='text-amber-300 size-15' />
            <h1 className="text-4xl font-bold text-white">
              Wheather App
            </h1>
          </div>
          <div className='flex justify-center gap-1 relative'>
            <input ref={inputRef} type="text" name='city' value={city} placeholder='search'  className=' bg-white/80 px-20 py-2 backdrop-blur-sm shawdow-lg rounded-lg left-5'
              onChange={(e) => setCity(e.target.value)}
            />
            <CiSearch className='absolute top-1/2 left-17 -translate-y-1/2' onClick={()=> search(inputRef.current.value)} />
            <button onClick={handleSubmit} className=' bg-black/30 hover:bg-black/50 px-2 backdrop-blur-sm shawdow-lg rounded-lg font-bold'>OK</button>
          </div>

          <div className='w-[450px] h-[500px] bg-black/5 flex flex-col justify-center items-center mx-auto mt-10 rounded-lg '>       
            <h1 className='font-bold text-white text-2xl '>{weatherData?.location}</h1>
            <div className='flex items-center gap-5'>
              {WeatherIcon && (
                <WeatherIcon className='text-amber-300 size-30'/>
              )}
             
              <p className='font-bold text-white text-7xl'> {weatherData?.temperature}°C</p>
            </div>

            <div className='flex gap-3 mt-15'>
              <div className='w-50 h-17.5 bg-white/20 flex justify-center items-center gap-5 py-10 rounded-lg border border-white/15 shadow-md'>
                <WiHumidity className='size-15' />
                <div>
                  <p className='font-bold text-xl'>Humidity</p>
                  <p className='font-bold'>{weatherData?.humidity}%</p>
                </div>
              </div>

              <div className='w-50 h-17.5 bg-white/20 flex justify-center items-center gap-5 py-10 rounded-lg border border-white/15 shadow-md'>
                < WiDayWindy  className='size-15' />
                <div>
                  <p className='font-bold text-xl'>Vent</p>
                  <p className='font-bold'>{weatherData?.windSpeed}m/s </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App

