const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'public', `${page}.ejs`)

app.listen(PORT, (error) => {
    error ? console.error(errer) : console.log(`listen ${PORT}`)
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const title ='Главная';
    const devices = [
        {
            name: 'pH-метр Mettler-Toledo International, Inc. SevenCompact S220',
            img: './img/pH.png'
        },
        {
            name: 'Спектрофотометр Varian, Inc Cary 50 Bio',
            img: './img/pH.png'
        },
        {
            name: 'Титратор',
            img: './img/pH.png'
        },
        {
            name: 'Коагулометр Tcoag, KC 4 Delta',
            img: './img/pH.png'
        },
        {
            name: 'Коагулометр Tcoag, KC 1 Delta',
            img: './img/pH.png'
        },,
        {
            name: 'Коагулометр Tcoag, KC 3 Delta',
            img: './img/pH.png'
        },
        {
            name: 'Коагулометр Tcoag, KC 2 Delta',
            img: './img/pH.png'
        }
        
    ]
    res.render(createPath('main'), {devices, title});
});

app.get('/analytics', (req, res) => {
    const title = 'Аналитика';
    res.render(createPath('analytics'), {title});
});

app.use((req, res) => {
    const title = 'Страница не найдена';
    res
        .status(404)
        .sendFile(createPath('error'), {title})
});