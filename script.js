function createDay(
  feelslikemax,
  feelslikemin,
  feelslike,
  temp,
  tempmax,
  tempmin,
  uvindex,
) {
  return {
    feelslikemax,
    feelslikemin,
    feelslike,
    temp,
    tempmax,
    tempmin,
    uvindex,
  };
}

const searchForm = document.querySelector(".search-form");
const locationInput = document.querySelector("#location-input");
const toggleUnits = document.querySelector("#toggle-units");
const searchButton = document.querySelector(".search-button");
let currentLocation = "";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;
  currentLocation = location;
  const unit = toggleUnits.checked ? "us" : "metric";
  getWeather(location, unit);
});

toggleUnits.addEventListener("change", (event) => {
  if (!currentLocation) return;
  getWeather(currentLocation, toggleUnits.checked ? "us" : "metric");
});

const getWeather = async (location, unit) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unit}&key=TLJ7F3K5NSFKZWLUDSYCYLK8D`,
    );

    if (!response.ok) {
      throw new Error(`Fail to get weather status! Error: ${response.status}`);
    }

    const responseJSON = await response.json();

    const currentConditions = responseJSON.currentConditions;
    const currentFeelslike = currentConditions.feelslike;
    const currentTemp = currentConditions.temp;
    const currentUV = currentConditions.uvindex;
    console.log(
      `It feels like: ${currentFeelslike} | Current temperature: ${currentTemp} | UV index: ${currentUV}`,
    );

    const days = responseJSON.days;
    const daysArr = [];
    for (let i = 0; i < Math.min(4, days.length); i++) {
      daysArr.push(
        createDay(
          days[i].feelslikemax,
          days[i].feelslikemin,
          days[i].feelslike,
          days[i].temp,
          days[i].tempmax,
          days[i].tempmin,
          days[i].uvindex,
        ),
      );
    }

    console.log(daysArr);
  } catch (error) {
    console.log(error);
  }
};
