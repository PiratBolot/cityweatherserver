import express from 'express';

export default () =>
    express.Router()
        .get('/', async (req, res) => {
                try {
                    res.json(await repo.getCities());
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
                const result = await weatherApiByCity(req.body.name);
                if (result && result.status === "fail") {
                    res.status(result.response.cod).json({error: result.response});
                    return;
                }
                try {
                    await repo.addCity(req.body.name);
                    res.json({result: "OK"});
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
                    res.json({result: "OK"});
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        );