"use strict";
const blockMain = document.querySelector("main");
const url = "https://api.weatherapi.com/v1/forecast.json?key=50b1f8bb52cf40dfbe0125337211211&days=7&aqi=no&alerts=no";
let option = "current";

// elements
const setCurrentWeatherHTML = function(data) {
    let values = {
        cityName : data.location.name,
        date     : data.location.localtime, 
        icon     : data.current.condition.icon,
        text     : data.current.condition.text,
        temp     : data.current.temp_c + "&#176;"
    };
    blockMain.insertAdjacentHTML(
        "beforeend",
        `
        <section class="current-weather">
        <div class="top">
            <p class="top__name">Current weather</p>
            <p class="top__date">${values.date}</p>
        </div>
        <div class="body">
            <div class="body__city-name">${values.cityName}</div>
            <div class="body__desc">
                <img src="${values.icon}" class="desc__img">
                <p class="desc__text">${values.text}</p>
            </div>
            <div class="body__temp">${values.temp}</div>
        </div>
        </section>
        `
    )
};
const setCurrentWeatherInfoHTML = function(data) {
    let values = {
        sunrise    : data.forecast.forecastday[0].astro.sunrise,
        sunset     : data.forecast.forecastday[0].astro.sunset,
        rainChance : data.forecast.forecastday[0].day.daily_chance_of_rain + " %",
        humidity   : data.current.humidity + " %",
        wind       : `${data.current.wind_dir} ${data.current.wind_kph} kph`,
        feelsLike  : data.current.feelslike_c + "&#176;",
        precip     : data.current.precip_mm + " mm",
        pressure   : data.current.pressure_mb + " mb",
        visibility : data.current.vis_km + " km",
        uv         : data.current.uv,
    };

    blockMain.insertAdjacentHTML(
        "beforeend",
        `
        <section class="current-weather-info">
        <div class="top">Info</div>
        <div class="body">
            <div class="box-1">
                <div class="wrapp">
                    <p class="name">Sunrise</p>
                    <p class="value">${values.sunrise}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Sunset</p>
                    <p class="value">${values.sunset}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Chance of rain</p>
                    <p class="value">${values.rainChance}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Humidity</p>
                    <p class="value">${values.humidity}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Wind</p>
                    <p class="value">${values.wind}</p>
                </div>
            </div>
            <div class="box-2">
                <div class="wrapp">
                    <p class="name">Feels like</p>
                    <p class="value">${values.feelsLike}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Precipitation</p>
                    <p class="value">${values.precip}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Pressure</p>
                    <p class="value">${values.pressure}</p>
                </div>
                <div class="wrapp">
                    <p class="name">Visibility</p>
                    <p class="value">${values.visibility}</p>
                </div>
                <div class="wrapp">
                    <p class="name">UV-index</p>
                    <p class="value">${values.uv}</p>
                </div>
            </div>
        </section>
        `
    );
};
const setDailyForecastHTML = function(data) {
    blockMain.innerHTML += "<section class='daily-forecast'></section>";
    let section = document.querySelector(".daily-forecast");
    data.forecast.forecastday.forEach(value => {
        section.innerHTML += 
        `
        <div class="box">
            <p class="box__day"></p>
            <p class="box__date">${value.date}</p>
            <p class="box__icon"><img src="${value.day.condition.icon}"></p>
            <p class="box__temp">${value.day.avgtemp_c}&#176;</p>
            <p class="box__text">${value.day.condition.text}</p>
        </div>   
        `
    });
};
const setHourlyForecastHTML = function(data) {
    blockMain.innerHTML += "<section class='hour-forecast'></section>";
    let section = document.querySelector(".hour-forecast");
    data.forecast.forecastday[0].hour.forEach(value => {
        section.innerHTML += 
        `
        <div class="box">
            <p class="box__time">${value.time.slice(-5)}</p>
            <p class="box__icon"><img src="${value.condition.icon}"></p>
            <p class="box__temp">${value.temp_c}&#176;</p>
            <p class="box__text">${value.condition.text}</p>
        </div>   
        `
    });
};

// nav
const nav = document.querySelector("nav");
const optionHandler = function(e) {
    let option1 = document.querySelector("[data-option='current']");
    let option2 = document.querySelector("[data-option='forecast']");
    if (e.target == option1) {
        option2.classList.remove("active");
        option1.classList.add("active");
        option = "current";
        queryHandler();
    } else if (e.target == option2) {
        option2.classList.add("active");
        option1.classList.remove("active");
        option = "forecast";
        queryHandler();
    }
};
nav.addEventListener("click", optionHandler);

// query
const searchLine = document.getElementById("search-line");
const searchBtn = document.getElementById("search-btn");
const queryHandler = function() {
    let q = `&q=${searchLine.value}`;
    fetch(url + q)
    .then(data => data.json())
    .then(data => {
        if (data.error) {
            blockMain.innerText = "Location could not be found"
        } else {
            blockMain.innerHTML = "";
            if (option == "current") {
                setCurrentWeatherHTML(data);
                setCurrentWeatherInfoHTML(data);
            } else if (option == "forecast") {
                setDailyForecastHTML(data);
                setHourlyForecastHTML(data);
            }
        }
    });
};
searchBtn.addEventListener("click", queryHandler);