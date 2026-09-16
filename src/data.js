function createDay(
  feelslikemax,
  feelslikemin,
  feelslike,
  temp,
  tempmax,
  tempmin,
  uvindex,
  date,
) {
  return {
    feelslikemax,
    feelslikemin,
    feelslike,
    temp,
    tempmax,
    tempmin,
    uvindex,
    date,
  };
}

export function createDaysArray(responseJSON) {
  const days = responseJSON.days;
  const daysArr = [];
  for (let i = 0; i < Math.min(7, days.length); i++) {
    daysArr.push(
      createDay(
        days[i].feelslikemax,
        days[i].feelslikemin,
        days[i].feelslike,
        days[i].temp,
        days[i].tempmax,
        days[i].tempmin,
        days[i].uvindex,
        days[i].datetime,
      ),
    );
  }

  return daysArr;
}
