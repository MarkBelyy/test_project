const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const createPath = require('./helpers/create-path');
const devicesRoutes = require('./routes/devices-routes')
require('dotenv').config();

app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.error(err))

app.listen(process.env.PORT, (error) => {
    error ? console.error(errer) : console.log(`listen ${process.env.PORT}`)
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

app.use(devicesRoutes);

app.use((req, res) => {
    const title = 'Страница не найдена';
    res
        .status(404)
        .render(createPath('error'), { title })
});