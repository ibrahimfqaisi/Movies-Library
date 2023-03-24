# Movies-Library

# Movies-Library - 1.0v

**Author Name**: ibrahim adnan

## WRRC

  ![WRRC](/assests/WRRC3.jpeg)

## Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

- Initialize your project by running the following command "npm init -y".
- Create basic file structure (server.js)
- Install the required packages for this lab: "npm install express"
- npm i cors
- npm i nodemon
- npm install axios
- npm i dotenv
- npm install body-parser
- npm install pg

## Project Features
<!-- What are the features included in you app -->
- the server has "/"  for home page and it show title": ("Spider-Man ,"poster_path" ,"overview") from the .
- the server has "/favorite"  for /favorite page and it show title": ("Welcome to Favorite Page
") from the .
- the server has Handle errors {
(status 500)  is printing the server error ,
(status 404)  is printing page not found error".}
- the server has "/search"  to Search for movies.

- the server has "/trending" to Get the daily or weekly trending items. The daily trending list tracks items over the period of a day while items have a 24 hour half life. The weekly list tracks items over a 7 day period, with a 7 day half life.

- the server has "/Popular" to Get a list of the current popular movies on TMDB. This list updates daily.

- the server has "/TopRated" to Get the top rated movies on TMDB.

- the server has "/addMovie" to create a post request to save a specific movie to database along with your personal comments.

- the server has "/getMovies" to Create a get request to get all the data from the database.
