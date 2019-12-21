import express from 'express';
import http from 'http';
import logger from 'morgan';
import cors from 'cors';

import weatherRouter from './routes/weatherRouter';
import favouritesRouter from './routes/favouritesRouter';

import config from './config'

const app = () =>
    configureServer(
        configureApp()
    );

const configureApp = () =>
    express()
        .use(logger('dev'))
        .use(express.json())
        .use(express.urlencoded({extended: false}))
        .use(cors())
        .set('port', config.server.port)
        .use('/weather', weatherRouter())
        .use('/favourites', favouritesRouter());

const configureServer = (app) =>
    http.createServer(app)
        .listen(config.server.port)
        .on('error', (error) => {
            throw error
        })
        .on('listening', () =>
            console.log('Server is listening on port ' + config.server.port)
        );

app();