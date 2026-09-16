import "./styles.css";
import { getWeather } from "./api.js";
import { fillWeatherData } from "./display.js";

const searchForm = document.querySelector(".search-form");
const locationInput = document.querySelector("#location-input");
const toggleUnits = document.querySelector("#toggle-units");
let currentLocation = "";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  const unit = toggleUnits.checked ? "us" : "metric";

  const weather = await setTimeout(() => getWeather(location, unit), 5000);
  if (!weather) return;

  currentLocation = location;
  fillWeatherData(weather, unit);
});

toggleUnits.addEventListener("change", async () => {
  if (!currentLocation) return;
  const unit = toggleUnits.checked ? "us" : "metric";
  const weather = await getWeather(currentLocation, unit);

  if (!weather) return;
  fillWeatherData(weather, unit);
});
