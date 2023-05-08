const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`path: ${req.path}`);
    console.log(`method: ${req.method}`);
    next();
})

app.get('/', (req, res) => {
    const title = 'Главная';
    Devices
        .find()
        .then((devices) => {
            res.render(createPath('main'), { devices, title })
            // console.log('devices:', devices)
        })
        .catch((err) => {
            console.log('err:', err);
            // render(createPath('error'), {title})
        })
});

app.get('/search', (req, res) => {
    const searchQuery = req.query.query.trim();
    const searchRegex = new RegExp(searchQuery, 'i');
    Devices
        .find({ name: searchRegex })
        .then(devices => {
            res.json(devices);
        })
        .catch(error => {
            console.error(error);
            res
                .status(500)
                .json({ error: 'Ошибка сервера' });
        });
});

app.get('/analytics', (req, res) => {
    const title = 'Аналитика';
    res.render(createPath('analytics'), { title });
});

app.get('/analytics/:id', (req, res) => {
    const title = 'Аналитика';
    console.log('deviceId ', req.params.id)
    Devices
        .findById(req.params.id)
        .then(device => {
            res.render(createPath('analytics'), { device, title });
            // console.log('device:', device);
        })
        .catch(err => {
            console.log('err:', err);
            // render(createPath('error'), {title})
        })
});

app.get('/device/:id', (req, res) => {
    Devices
        .findById(req.params.id)
        .then(device => {
            res.json(device);
        })
    .catch(error => {
        console.error(error);
        res
            .status(500)
            .json({ error: 'Ошибка сервера' });
    });
});

app.post('/device/work/:id', (req, res) => {
    console.log('deviceId ', req.params.id)
    console.log("req.body", req.body.free)

    Devices.findByIdAndUpdate(req.params.id, { $set: { free: req.body.free } })
        .then(() => res.json({ message: "Success" }))
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Server Error" });
        });
});

app.post('/device/like/:id', (req, res) => {
    console.log('deviceId ', req.params.id)
    console.log("req.body", req.body.like)

    Devices.findByIdAndUpdate(req.params.id, { $set: { like: req.body.like } })
        .then(() => res.json({ message: "Success" }))
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Server Error" });
        });
});



app.use((req, res) => {
    const title = 'Страница не найдена';
    res
        .status(404)
        .render(createPath('error'), { title })
});