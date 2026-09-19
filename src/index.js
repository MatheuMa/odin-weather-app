import "./styles.css";
import { getWeather } from "./api.js";
import { fillWeatherData, loading } from "./display.js";

const searchForm = document.querySelector(".search-form");
const locationInput = document.querySelector("#location-input");
const toggleUnits = document.querySelector("#toggle-units");
let currentLocation = "";

async function updateWeather(location, unit) {
  loading(true);

  try {
    const weather = await getWeather(location, unit);
    if (!weather) return;

    currentLocation = location;
    fillWeatherData(weather, unit);
  } finally {
    loading(false);
  }
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  const unit = toggleUnits.checked ? "us" : "metric";
  await updateWeather(location, unit);
});

toggleUnits.addEventListener("change", async () => {
  if (!currentLocation) return;
  const unit = toggleUnits.checked ? "us" : "metric";
  await updateWeather(currentLocation, unit);
});
