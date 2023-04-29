const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Devices = require('./models/devices');


app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://markbelyy:myjM9TpEqSfCO4cm@biocad-test.gouqped.mongodb.net/botanique';

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.error(err))

const createPath = (page) => path.resolve(__dirname, 'public', `${page}.ejs`)

app.listen(PORT, (error) => {
    error ? console.error(errer) : console.log(`listen ${PORT}`)
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const title = 'Главная';
    Devices
        .find()
        .then((devices) => {
            res.render(createPath('main'), { devices, title })
            console.log('devices:', devices)
        })
        .catch((err) => {
            console.log('err:', err);
            // render(createPath('error'), {title})
        })
});

app.get('/analytics', (req, res) => {
    const title = 'Аналитика';
    res.render(createPath('analytics'), { title });
});

app.use((req, res) => {
    const title = 'Страница не найдена';
    res
        .status(404)
        .render(createPath('error'), { title })
});