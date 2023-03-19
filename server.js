'use strict';

const express = require('express')
const recipeData = require('./Movie Data/data.json')
const app = express();
const port = 3000

app.get('/', homePageHandler);
function homePageHandler(req, res) {
    let newdata = new Reformat(recipeData.title, recipeData.poster_path, recipeData.overview)
    res.send(newdata)
}

app.get("/favorite", favoriteHandeler)
function favoriteHandeler(req, res) {
    res.send("Welcome to Favorite Page")
}

app.use(handleServerError);
function handleServerError(err, req, res, next) {
    res.status(500).json({ status: 500, responseText: "Sorry, something went wrong" });
}

app.use(handlePageNotFoundError);
function handlePageNotFoundError(req, res, next) {
    res.status(404).json({ status: 404, responseText: "Sorry, the requested page could not be found" });
}

function Reformat(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})