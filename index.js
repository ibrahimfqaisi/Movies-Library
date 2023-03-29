'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const recipeData = require('./Movie Data/data.json')
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
const { Client } = require('pg')
const url = process.env.URL;
const port = process.env.PORT;
const my_key = process.env.MY_KEY;
const client = new Client(url)

app.get('/', homePageHandler);
app.get("/favorite", favoriteHandeler)
app.get("/search", searchHandeler);
app.get("/trending", trendingHandeler)
app.get("/Popular", PopularHandeler)
app.get("/TopRated", TopRatedHandeler)
app.post('/addMovie', addMovieHandeler);
app.get('/getMovies', getMoviesHandeler);
app.put('/UPDATE/:id',handleUpdate)//params;
app.delete('/DELETE/:id', handleDelete);
app.put('/getMovie/:id', handlegetMovie);

app.use(handleServerError);
app.get('*', handlePageNotFoundError);

function handleUpdate(req,res){
    console.log(req.params.id);
    let id = req.params.id // params
    let {title, poster_path, overviewAndComments} = req.body;
    let sql=`UPDATE movies_info SET title = $1, poster_path = $2, overviewAndComments=$3 
    WHERE id = $4 RETURNING *;`;
    let values = [title,poster_path,overviewAndComments,id];
    client.query(sql,values).then(result=>{
        console.log(result.rows);
        res.send(result.rows)
    }).catch()

}

function handlegetMovie(req,res){
    console.log(req.params.id);
    let id = req.params.id // params
    let sql=`SELECT * FROM movies_info WHERE id = $1 ;`;
    let values = [id];
    client.query(sql,values).then(result=>{
        console.log(result.rows);
        res.send(result.rows)
    }).catch()

}

function handleDelete(req,res){
    let {id} = req.params; //destructuring
    //or
    //let id = req.params.id
    let sql=`DELETE FROM movies_info WHERE id = $1;` ;
    let value = [id];
    client.query(sql,value).then(result=>{
        res.status(204).send("deleted");
    }).catch()


}

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
        .catch((error) => {
            handleServerError(error, req, res)
        })

}
function TopRatedHandeler(req, res) {

    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${my_key}&language=en-US&page=1`
    axios.get(url)
        .then((result) => {
            // console.log(result.data.results);

            res.json(result.data.results);
        })
        .catch((error) => {
            handleServerError(error, req, res)
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
        .catch((error) => {
            handleServerError(error, req, res)
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
        .catch((error) => {
            handleServerError(error, req, res)
        })
}




function favoriteHandeler(req, res) {

    res.send("Welcome to Favorite Page")
}

function homePageHandler(req, res) {

    let newdata = new Reformat(recipeData.title, recipeData.poster_path, recipeData.overview)
    res.send(newdata)
}

function addMovieHandeler(req, res) {
    console.log(req.body)
    let { title, poster_path, overviewAndComments } = req.body
    let sql = `INSERT INTO movies_info (title, poster_path, overviewAndComments)
        VALUES ($1, $2, $3) RETURNING *;`
    let value = [title, poster_path, overviewAndComments]
    client.query(sql, value).then((result) => {
        res.status(201).json(result.rows);
    }).catch()
    
}
function getMoviesHandeler(req,res){
let sql= ` SELECT * FROM movies_info;`
client.query(sql).then((result) =>{
    res.status(201).json(result.rows);
}).catch()

}
function Reformat(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}
function handlePageNotFoundError(req, res) {
    res.status(404).send("Sorry, the requested page could not be found");
}
function handleServerError(err, req, res, next) {
    res.status(500).json({ status: 500, responseText: "Sorry, something went wrong" });
}
function Reformat2(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date
    this.poster_path = poster_path;
    this.overview = overview;
}


client.connect().then(() => {

    app.listen(port, () => {
        console.log(`Server is listening ${port}`);
    });
})



