import express from 'express';
import * as repo from '../repository/favouritesRepository'
import {getWeatherByCityName} from "../weatherAPI/WeatherApi";

export default () =>
    express.Router()
        .get('/', async (req, res) => {
                try {
                    await res.json(await repo.getCities());
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        )
        .post('/', async (req, res) => {
                if (!req.body.name) {
                    res.status(400).json({error: "name is undefined"});
                    return;
                }
                const result = await getWeatherByCityName(req.body.name);
                if (result && result.status === "fail") {
                    res.status(result.response.cod).json({error: result.response});
                    return;
                }
                try {
                    await repo.addCity(req.body.name);
                    await res.json({result: "OK"});
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        )
        .delete('/', async (req, res) => {
                if (!req.body.name) {
                    res.status(400).json({error: "name is undefined"});
                    return;
                }
                try {
                    await repo.deleteCity(req.body.name);
                    await res.json({result: "OK"});
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        );