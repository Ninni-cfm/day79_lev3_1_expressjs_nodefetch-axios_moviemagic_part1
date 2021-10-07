const genres = require('./data/genres')
const genresAll = require('./data/genresAll');

const title = { title: 'MOVIEMAGIC' };

const express = require('express');
const app = express();

const axios = require('axios');
require('dotenv').config();


app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening to localhost:${port}`));



// get top rated movies
// https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=de-DE&page=1

// search for movies
// https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=de-de&query=star%20trek&page=1&include_adult=false

// get movie Details
// https://api.themoviedb.org/3/movie/{movie_id}}?api_key=${process.env.APIKEY}&language=de-DE

// get list of categories
// https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.APIKEY}&language=de-de

// get movie images
// https://api.themoviedb.org/3/movie/13475/images?api_key=${process.env.APIKEY}&language=de-de



//****************************************************************************************************************
app.get('/', (req, res) => {
    res.redirect(`/page/1`)
});

app.get('/page/:page', (req, res) => {

    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=de-DE&page=${req.params.page}`)
        .then(function (response) {
            // handle success
            res.render(
                'pages/index.ejs',
                {
                    title: 'MOVIEMAGIC',
                    genres: genres,
                    movies: response.data,
                    url: `/page`
                })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});


//****************************************************************************************************************
app.get('/details/:id', (req, res) => {

    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}}?api_key=${process.env.APIKEY}&language=de-DE`)
        .then(function (response) {
            // handle success
            res.render(
                'pages/movie-details',
                {
                    title: title,
                    details: response.data,
                    genresAll: genresAll
                }
            )
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});


//****************************************************************************************************************
app.get('/genres/:id', (req, res) => {
    res.redirect(`/genres/${req.params.id}/1`)
});
app.get('/genres/:id/:page', (req, res) => {

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.APIKEY}&language=de-de&sort_by=popularity.desc&include_adult=false&page=${req.params.page}&with_genres=${req.params.id}`)
        .then(function (response) {
            // handle success
            res.render(
                'pages/index.ejs',
                {
                    title: 'MOVIEMAGIC',
                    genres: genres,
                    movies: response.data,
                    url: `/genres/${req.params.id}`

                }
            )
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});


//****************************************************************************************************************
app.get('/search/:search', (req, res) => {
    res.redirect(`/search/${req.params.search}/1`)
});
app.get('/search/:search/:page', (req, res) => {

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=de-de&query=${req.params.search}&page=${req.params.page}&include_adult=false`)
        .then(function (response) {
            // handle success
            res.render(
                'pages/index.ejs',
                {
                    title: 'MOVIEMAGIC',
                    genres: genres,
                    movies: response.data,
                    url: `/search/${req.params.search}`
                }
            )
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});


//****************************************************************************************************************
app.use((req, res, next) => {
    return res.status(404).render('pages/err404.ejs', { url: req.url })
});
