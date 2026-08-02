function WeatherCard({ weather }) {
  const icon = weather.weather[0].icon;

  return (
    <div className="mt-8 text-white">

      <h2 className="text-center text-4xl font-bold">
        {weather.name}
      </h2>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt="weather icon"
        className="mx-auto"
      />

      <p className="text-center text-6xl font-bold">
        {Math.round(weather.main.temp)}°C
      </p>

      <p className="text-center text-xl capitalize mt-2">
        {weather.weather[0].description}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-white/20 rounded-2xl p-4 text-center">
          <p>Humidité</p>

          <p className="text-2xl font-bold mt-2">
            {weather.main.humidity}%
          </p>
        </div>

        <div className="bg-white/20 rounded-2xl p-4 text-center">
          <p>Vent</p>

          <p className="text-2xl font-bold mt-2">
            {weather.wind.speed} m/s
          </p>
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;