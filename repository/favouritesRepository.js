import mysql from "mysql";
import config from "../config";

const connection = () => mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.database,
    password: config.database.password
});

export const getCities = () => new Promise((resolve, reject) => {
    const c = connection();
    c.connect((err) => {
        if (err)
            reject(err);

        c.query("SELECT name FROM `fav_cities`", (err, record) => {
            c.end();
            if (err)
                reject(err);
            resolve(record);
        })
    })
});

export const addCity = (cityName) => new Promise((resolve, reject) => {
    if (!cityName)
        reject(new TypeError("cityName is undefined"));

    const c = connection();
    c.connect((err) => {
        if (err)
            reject(err);

        c.query("INSERT INTO `fav_cities` SET name = ?", [cityName], (err, record) => {
            c.end();
            if (err)
                reject(err);
            resolve(record);
        })
    })
});

export const deleteCity = (cityName) => new Promise((resolve, reject) => {
    if (!cityName)
        reject(new TypeError("cityName is undefined"));

    const c = connection();
    c.connect((err) => {
        if (err)
            reject(err);

        c.query("DELETE FROM `fav_cities` WHERE name = ?", [cityName], (err, record) => {
            c.end();
            if (err)
                reject(err);
            resolve(record);
        })
    })
});