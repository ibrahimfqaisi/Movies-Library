'use strict';

const express = require('express')
const recipeData = require('./Movie Data/data.json')
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const my_key = process.env.MY_KEY;
app.get('/', homePageHandler);
app.get("/favorite", favoriteHandeler)
app.get("/search", searchHandeler);
app.get("/trending", trendingHandeler)
app.get("/Popular", PopularHandeler)
app.get("/TopRated", TopRatedHandeler)
// app.use(handleServerError);
app.get('*', handlePageNotFoundError);


function trendingHandeler(req, res) {

    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${my_key}&language=en-US`
    axios.get(url)
        .then((result) => {
            // console.log(result.data.results);

            let dataTrending = result.data.results.map((results) => {
                return new Reformat2(results.id, results.title, results.release_date, results.poster_path, results.overview)
            })
            res.json(dataTrending);
        })
        .catch((err) => {
            console.log(err);
        })

}
function TopRatedHandeler(req, res) {

    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${my_key}&language=en-US&page=1`
    axios.get(url)
        .then((result) => {
            // console.log(result.data.results);

            res.json(result.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
}
function PopularHandeler(req, res) {

    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${my_key}&language=en-US&page=1`
    axios.get(url)
        .then((result) => {
            // console.log(result.data.results);

            let Popular = result.data.results.map((results) => {
                return new Reformat2(results.id, results.title, results.release_date, results.poster_path, results.overview)
            })
            res.json(Popular);
        })
        .catch((err) => {
            console.log(err);
        })
}


function searchHandeler(req, res) {
    let filmName = req.query.name // name it as you want 

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${my_key}&language=en-US&query=${filmName}&page=2`
    axios.get(url)
        .then((result) => {
            console.log(result.data.results);


            res.json(result.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
}


// function handleServerError(err, req, res, next) {
//     res.status(500).json({ status: 500, responseText: "Sorry, something went wrong" });
// }

function favoriteHandeler(req, res) {

    res.send("Welcome to Favorite Page")
}

function homePageHandler(req, res) {

    let newdata = new Reformat(recipeData.title, recipeData.poster_path, recipeData.overview)
    res.send(newdata)
}

function Reformat(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}
function handlePageNotFoundError(req, res) {
    res.status(404).send("Sorry, the requested page could not be found");
}

function Reformat2(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date
    this.poster_path = poster_path;
    this.overview = overview;
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})