import { createDaysArray } from "./data.js";

export const getWeather = async (location, unit) => {
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

    const datetime = timeToMinutes(currentConditions.datetime);
    const sunrise = timeToMinutes(currentConditions.sunrise);
    const sunset = timeToMinutes(currentConditions.sunset);

    const locationValue = responseJSON.resolvedAddress;

    const daysArr = createDaysArray(responseJSON);

    return {
      daysArr,
      currentFeelslike,
      currentTemp,
      currentUV,
      locationValue,
      datetime,
      sunrise,
      sunset,
    };
  } catch (error) {
    console.log(error);
  }
};

export function capitalize(string) {
  return string
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
