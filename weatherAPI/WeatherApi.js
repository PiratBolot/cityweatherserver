import fetch from 'node-fetch';
import config from '../config';

const COMPASS_POINTS = ["Северный", "С-С-В", "Северо-Восточный", "В-С-В", "Восточный", "В-Ю-В", "Юго-Восточный",
    "Ю-Ю-В", "Южный", "Ю-Ю-З", "Юго-Западный", "З-Ю-З", "Западный", "З-С-З", "Северо-Западный", "С-С-З"];

const toJson = (promise) => (
    promise.then(
        (response) => {
            return response;
        },
        (e) => {
            console.log("Получили битые данные");
        }
    ).then(
        async (response) => {
            let json = await response.json();
            return {status: json.cod.toString(), response: json};
        }
    )
);

const getWeatherByCityName = async (city) => (
    toJson(
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + config.weatherApi.API_KEY + "&lang=ru")
    )
);

const getWeatherByCoords = async (coords) => (
    toJson(
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude
        + "&lon=" + coords.longitude + "&appid=" + config.weatherApi.API_KEY + "&lang=ru"
        )
    )
);

const degToCompass = (num) => {
    let val = Math.floor((num / 22.5) + 0.5);
    return COMPASS_POINTS[(val % 16)];
};

const parseWeatherResponse = (res) => (
    [
        {key: "Ветер", value: res.wind.speed + " м/с, " + degToCompass(res.wind.deg)},
        {key: "Давление", value: res.main.pressure + " hPa"},
        {key: "Влажность", value: res.main.humidity + " %"},
        {key: "Координаты", value: "[" + res.coord.lat + ", " + res.coord.lon + "]"}
    ]
);

export {getWeatherByCityName, getWeatherByCoords, parseWeatherResponse};