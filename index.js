const categories = require('./data/categories')
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



app.get('/', (req, res) => {
    // res.render('pages/index.ejs', { title: 'MOVIEMAGIC', categories: categories })
    // const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=de-DE&page=1`;
    // console.log(url);

    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=de-DE&page=1`)
        .then(function (response) {
            // handle success
            res.render('pages/index.ejs', { title: 'MOVIEMAGIC', categories: categories, movies: response.data })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });


});



app.get('/details', (req, res) => {
    console.log(`https://newsapi.org/v2/everything?q=tesla&from=2021-09-07&sortBy=publishedAt&apiKey=${process.env.APIKEY}`);

    axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2021-09-07&sortBy=publishedAt&apiKey=${process.env.APIKEY}`)
        .then(function (response) {
            // handle success
            // console.log(response.data.articles);
            res.render('/pages/movie-details', { title: title })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});

app.get('/category/:category', (req, res) => {

});

app.get('/search/:search', (req, res) => {

});

app.get('/page/:page', (req, res) => {

});


app.use((req, res, next) => {
    return res.status(404).render(`pages/err404.ejs`, { title: title, url: req.url })
});
