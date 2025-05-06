"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cities`
        );
        setAvailableCities(response.data.cities);
        if (response.data.cities.length > 0) {
          setSelectedCity(response.data.cities[0]);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Failed to load cities. Please refresh the page.");
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen px-80 max-md:px-0 max-xl:px-0 flex justify-center items-center rounded-2xl bg-white">
      <div className="w-full p-8 flex flex-row justify-start gap-8 max-md:flex-wrap rounded-2xl bg-[url('/1.jpeg')] bg-cover bg-no-repeat bg-center bg-fixed">
        <div className="flex flex-col justify-center items-center gap-2 py-4 px-10 bg-[#fee2b8] rounded-2xl text-[#faa87a] max-md:w-full">
          <select
            className="text-lg font-normal"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {weatherData && (
            <>
              <div
                className="flex flex-row justify-start items-center gap-4 text-7xl text-peach"
                style={{ color: "#faa87a" }}
              >
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                  width={80}
                  height={80}
                />
                <h1>
                  {Math.round(weatherData.temperature)}
                  <sup>°</sup>
                </h1>
              </div>

              <h3 className="font-bold capitalize">
                {weatherData.description}
              </h3>
              <p>
                {weatherData.city}, {weatherData.country}
              </p>
              <p>{new Date(weatherData.timestamp).toLocaleString()}</p>
              <p>
                Feels like {Math.round(weatherData.feelsLike)}° | Sunset{" "}
                {new Date(weatherData.sunset).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-start text-white gap-8">
          <div className="p-4 border border-white/20 bg-white/20 backdrop-blur-md shadow-sm rounded-2xl flex flex-col gap-4">
            <div className="flex flex-row justify-around items-center">
              {weatherData &&
                Array(5)
                  .fill()
                  .map((_, idx) => (
                    <div className="flex flex-col gap-1 text-sm" key={idx}>
                      <p>{idx < 1 ? "Now" : `${idx} AM `}</p>
                      <div className="flex flex-row items-center gap-1">
                        <Image
                          src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                          alt="icon"
                          width={30}
                          height={30}
                        />
                        <p>
                          {Math.round(weatherData.temperature)}
                          <sup>°</sup>
                        </p>
                      </div>
                    </div>
                  ))}
            </div>

            <div className="w-full border-t border-[0.2px]" />

            <div className="flex flex-row justify-around items-center">
              {weatherData &&
                Array(5)
                  .fill()
                  .map((_, idx) => (
                    <div className="flex flex-col gap-1 text-sm" key={idx}>
                      <p>{idx < 1 ? "Now" : `${idx} AM `}</p>
                      <div className="flex flex-row items-center gap-1">
                        <Image
                          src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                          alt="icon"
                          width={30}
                          height={30}
                        />
                        <p>
                          {Math.round(weatherData.temperature)}
                          <sup>°</sup>
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Random Text</h2>
            <p className="text-xs">
              {" "}
              is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
