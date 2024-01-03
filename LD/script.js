const WeatherApp = class {
  constructor(apiKey, resultsBlockSelector) {
    this.apiKey = apiKey;
    this.resultBlock = document.querySelector(resultsBlockSelector);

    this.getCurrentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q={cityQuery}&appid=${apiKey}&units=metric&lang=pl`;
    this.forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q={cityQuery}&appid=${apiKey}&units=metric&lang=pl`;

    this.currentWeather = undefined;
    this.forecast = undefined;
  }

  getCurrentWeather(cityQuery) {
    let url = this.getCurrentWeatherLink.replace("{cityQuery}", cityQuery);
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", () => {
      //   console.log(JSON.parse(req.responseText));
      this.currentWeather = JSON.parse(req.responseText);
      this.drawWeather(cityQuery);
    });
    req.send();
  }

  getForecast(cityQuery) {
    let url = this.forecastLink.replace("{cityQuery}", cityQuery);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.forecast = data.list;
        this.drawWeather(cityQuery);
      });
  }

  getWeather(cityQuery) {
    this.getCurrentWeather(cityQuery);
    this.getForecast(cityQuery);
  }

  drawWeather(cityQuery) {
    this.resultBlock.innerHTML = "";

    let headerCurrent = document.createElement("h2");
    headerCurrent.innerHTML = "Obecnie";
    this.resultBlock.appendChild(headerCurrent);

    if (this.currentWeather) {
      const date = new Date(this.currentWeather.dt * 1000);
      const weatherBlock = this.createWeatherBlock(
        `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString(
          "pl-PL"
        )}`,
        this.currentWeather.main.temp,
        this.currentWeather.weather[0].icon,
        this.currentWeather.weather[0].description
      );
      this.resultBlock.appendChild(weatherBlock);
    }

    let headerForecast = document.createElement("h2");
    headerForecast.innerHTML = "Prognoza na następne pięć dni";
    this.resultBlock.appendChild(headerForecast);

    if (this.forecast) {
      for (let i = 0; i < this.forecast.length; i++) {
        let weather = this.forecast[i];

        if (i % 8 === 0) {
          const dayNumber = document.createElement("h3");
          dayNumber.innerHTML = "Dzień " + (i / 8 + 1);
          this.resultBlock.appendChild(dayNumber);
        }

        const date = new Date(weather.dt * 1000);
        const weatherBlock = this.createWeatherBlock(
          `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString(
            "pl-PL"
          )}`,
          weather.main.temp,
          weather.weather[0].icon,
          weather.weather[0].description
        );
        this.resultBlock.appendChild(weatherBlock);
      }
    }
  }

  createWeatherBlock(dateString, temperature, iconName, description) {
    const weatherBlock = document.createElement("div");
    weatherBlock.className = "weather-block";

    const dateBlock = document.createElement("div");
    dateBlock.className = "weather-date";
    dateBlock.innerHTML = dateString;
    weatherBlock.appendChild(dateBlock);

    const temperatureBlock = document.createElement("div");
    temperatureBlock.className = "weather-temperature";
    temperatureBlock.innerHTML = `${Math.round(temperature * 10) / 10} &deg;C`;
    weatherBlock.appendChild(temperatureBlock);

    const iconImg = document.createElement("img");
    iconImg.className = "weather-icon";
    iconImg.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
    weatherBlock.appendChild(iconImg);

    const descriptionBlock = document.createElement("div");
    descriptionBlock.className = "weather-description";
    descriptionBlock.innerHTML = `${description}`;
    weatherBlock.appendChild(descriptionBlock);

    return weatherBlock;
  }
};

document.weatherApp = new WeatherApp(
  "7ded80d91f2b280ec979100cc8bbba94",
  "#weather-results-container"
);

document.querySelector("#checkButton").addEventListener("click", function () {
  const cityQuery = document.querySelector("#locationInput").value;
  document.weatherApp.getWeather(cityQuery);
});
