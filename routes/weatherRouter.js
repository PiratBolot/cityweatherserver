import express from 'express';

export default () =>
    express.Router()
        .get('/', async (req, res) => {
                if (!req.query.city) {
                    res.json({error: "city is undefined"});
                    return;
                }
                const result = await weatherApiByCity(req.query.city);
                if (result.status === "ok")
                    res.json(result.response);
                else
                    res.status(result.response.cod).json({error: "weather api fail", result: result.response});
            }
        )
        .get('/id', async (req, res) => {

            }
        )
        .get('/coordinates', async (req, res) => {
                if (!req.query.lat) {
                    res.json({error: "lat is undefined"});
                    return;
                }
                if (!req.query.lon) {
                    res.json({error: "lon is undefined"});
                    return;
                }

                const result = await weatherApiByCoords({latitude: req.query.lat, longitude: req.query.lon});
                if (result.status === "ok")
                    res.json(result.response);
                else
                    res.status(result.response.cod).json({error: "weather api fail", result: result.response});
            }
        );