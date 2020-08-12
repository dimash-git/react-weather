import React, { useEffect, useState } from "react"
import Header from "./Components/Header"
import Weather from "./Components/Weather"

import logo from "./logo.svg"
import "./App.css"

const App = () => {
  const API_KEY = "your own api key"
  const [forecasts, setForecasts] = useState([])
  const [searchTerm, setSearchTerm] = useState("Almaty")
  const [city, setCity] = useState({
    name: "",
    country: "",
    desc: "",
    hum: "",
    wind: "",
    temp: "",
    icon: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getForecasts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const getForecasts = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      mapToWeatherInterface(data)
    } catch (err) {
      setError("Location was not found")
    }
    setIsLoading(false)
  }

  const mapToWeatherInterface = (data) => {
    setCity({
      name: data.city.name,
      country: data.city.country,
      desc: data.list[1].weather[0].description,
      icon: data.list[1].weather[0].icon,
      hum: data.list[1].main.humidity,
      wind: Math.round(data.list[1].wind.speed * 3.6),
      temp: data.list[1].main.temp,
    })
    setForecasts(() => {
      let mappedData = []
      for (let i = 9; i < data.list.length; i = i + 8) {
        mappedData.push(data.list[i])
      }
      return mappedData
    })
    // console.log(forecasts)
    setError("")
  }
  return (
    <div className="App">
      <Header logo={logo} />
      {city.name && (
        <Weather
          city={city}
          setSearchTerm={setSearchTerm}
          forecasts={forecasts}
          error={error}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  )
}

export default App
