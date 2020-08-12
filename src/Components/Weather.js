import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import dayjs from "dayjs"
import weatherIcons from "../icons.js"
import "../weather-icons.min.css"

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
    margin: "0 auto",
    marginBottom: "1rem"
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem"
  },
  pr1: {
    paddingRight: "1rem"
  },
  error: {
    color: "red",
    padding: "10px"
  },
  cap: {
    textTransform: "capitalize"
  },
  pad: {
    paddingTop: "4rem",
    paddingBottom: "2rem",
    fontWeight: 400
  },
  listItem: {
    padding: "1.5rem 0.25rem"
  },
  icon: {
    float: "right",
    padding: "15px",
    fontSize: "110px",
    color: "purple"
  },
  forecastIcon: {
    fontSize: "30px",
    color: "purple"
  },
  addIcons: {
    color: "purple",
    padding: "0 0.5rem"
  }
})

const WeatherSearch = ({ isLoading, setSearchTerm, setIsLoading, error }) => {
  const classes = useStyles()
  const [val, setVal] = useState("")
  const handleChange = e => {
    setVal(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    setSearchTerm(val)
  }
  return (
    <div className={classes.searchWrapper}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          placeholder="Enter a city name"
          className={classes.pr1}
          value={val}
          name="searchTerm"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment className={classes.pr1}>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                {isLoading && <CircularProgress size={20} />}
              </InputAdornment>
            )
          }}
        />
        {error && (
          <Typography className={classes.error} error>
            {error}
          </Typography>
        )}
      </form>
    </div>
  )
}

const WeatherCard = ({ forecasts, city }) => {
  const classes = useStyles()
  const dateObj = new Date()
  const currTime = dateObj.getHours() + ":" + dateObj.getMinutes()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {city.name + ", " + city.country}
        </Typography>
        <Typography
          variant="body1"
          display="block"
          color="textSecondary"
          className={classes.cap}
        >
          {dayjs(dateObj).format("dddd") + ", " + currTime + ", " + city.desc}
        </Typography>
        <Typography display="block">
          <i className={`wi ${weatherIcons[city.icon]} ${classes.icon}`}></i>
        </Typography>
        <Typography variant="h2" color="textPrimary" className={classes.pad}>
          {Math.floor(city.temp * 10) / 10} &#8451;
        </Typography>
        <Typography
          variant="h6"
          style={{ paddingBottom: "1rem", fontSize: 15 }}
        >
          <i className={`wi wi-strong-wind ${classes.addIcons}`}></i>
          {city.wind} km/h
          <i className={`wi wi-humidity ${classes.addIcons}`}></i>
          {city.hum}% Humidity
        </Typography>
        <Divider variant="middle" />
        <WeatherForecast forecasts={forecasts} />
      </CardContent>
    </Card>
  )
}

const WeatherForecast = ({ forecasts }) => {
  const classes = useStyles()
  return (
    <List>
      {forecasts.map(forecast => (
        <ListItem button key={forecast.dt} className={classes.listItem}>
          <ListItemText
            primary={dayjs(forecast.dt_txt).format("dddd")}
            style={{ textAlign: "left", flex: "1 1 0%" }}
          ></ListItemText>
          <IconButton disabled={true}>
            <i
              className={`wi ${weatherIcons[forecast.weather[0].icon]} ${
                classes.forecastIcon
              }`}
            ></i>
          </IconButton>
          <ListItemText style={{ textAlign: "right", flex: "1 1 0%" }}>
            {Math.floor(forecast.main.temp * 10) / 10} &#8451;
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

const Weather = ({
  city,
  setSearchTerm,
  forecasts,
  error,
  isLoading,
  setIsLoading
}) => {
  return (
    <div>
      <WeatherSearch
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
      />
      <WeatherCard forecasts={forecasts} city={city} />
    </div>
  )
}

export default Weather
