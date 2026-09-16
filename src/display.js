import { capitalize } from "./api.js";

const html = document.documentElement;

const currentTemperature = document.querySelector(".current-temp > h3");
const currentFeelslikeTemp = document.querySelector(".current-feelslike > h3");
const currentUVIndex = document.querySelector(".current-UV > h3");

const todayTempHigh = document.querySelector(".today-temp .today-temp-high");
const todayTempLow = document.querySelector(".today-temp .today-temp-low");
const todayTempAvg = document.querySelector(".today-temp .today-temp-avg");

const todayFeelsHigh = document.querySelector(
  ".today-feelslike .today-feels-high",
);
const todayFeelsLow = document.querySelector(
  ".today-feelslike .today-feels-low",
);
const todayFeelsAvg = document.querySelector(
  ".today-feelslike .today-feels-avg",
);
const forecasts = document.querySelector(".forecasts");

const todayUVAvg = document.querySelector(".today-UV .today-UV-p");
const location = document.querySelector(".location");

export function fillWeatherData(
  {
    daysArr,
    currentFeelslike,
    currentTemp,
    currentUV,
    locationValue,
    datetime,
    sunrise,
    sunset,
  },
  unit,
) {
  let tempUnit = unit === "metric" ? "°C" : "°F";

  daysArr.forEach((day, index) => {
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");

    const date = document.createElement("p");
    date.classList.add("date");
    if (index === 0) {
      date.textContent = `${day.date} (today)`;
    } else {
      date.textContent = day.date;
    }

    const forecastStats = document.createElement("div");
    forecastStats.classList.add("forecast-stats");

    const tempMaxDiv = document.createElement("div");
    tempMaxDiv.classList.add("temp-max");
    const dailyHighTitle = document.createElement("p");
    dailyHighTitle.textContent = "High";
    const dailyHighStats = document.createElement("p");
    dailyHighStats.textContent = `${day.tempmax} ${tempUnit}`;
    tempMaxDiv.append(dailyHighTitle, dailyHighStats);

    const tempMinDiv = document.createElement("div");
    tempMinDiv.classList.add("temp-min");
    const dailyLowTitle = document.createElement("p");
    dailyLowTitle.textContent = "Low";
    const dailyLowStats = document.createElement("p");
    dailyLowStats.textContent = `${day.tempmin} ${tempUnit}`;
    tempMinDiv.append(dailyLowTitle, dailyLowStats);

    const uvDiv = document.createElement("div");
    uvDiv.classList.add("uv");
    const dailyUVTitle = document.createElement("p");
    dailyUVTitle.textContent = "UV";
    const dailyUVStats = document.createElement("p");
    dailyUVStats.textContent = day.uvindex;
    uvDiv.append(dailyUVTitle, dailyUVStats);

    forecastStats.append(tempMaxDiv, tempMinDiv, uvDiv);
    forecast.append(date, forecastStats);
    forecasts.append(forecast);
  });

  location.textContent = capitalize(locationValue);

  currentTemperature.textContent = `${currentTemp} ${tempUnit}`;
  currentFeelslikeTemp.textContent = `${currentFeelslike} ${tempUnit}`;
  currentUVIndex.textContent = `${currentUV}`;

  todayTempHigh.textContent = `${daysArr[0].tempmax} ${tempUnit}`;
  todayTempLow.textContent = `${daysArr[0].tempmin} ${tempUnit}`;
  todayTempAvg.textContent = `${daysArr[0].temp} ${tempUnit}`;

  todayFeelsHigh.textContent = `${daysArr[0].feelslikemax} ${tempUnit}`;
  todayFeelsLow.textContent = `${daysArr[0].feelslikemin} ${tempUnit}`;
  todayFeelsAvg.textContent = `${daysArr[0].feelslike} ${tempUnit}`;

  todayUVAvg.textContent = `${daysArr[0].uvindex}`;

  if (datetime < sunrise || datetime > sunset) {
    html.dataset.period = "evening";
  } else if (datetime < 780) {
    html.dataset.period = "morning";
  } else {
    html.dataset.period = "day";
  }
}
