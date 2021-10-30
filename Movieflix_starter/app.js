/*
 Authors: Bill
 Your name and student #: Tuong Long, Hong A01263601
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  form = req.body
  let movieName = form.textarea
  let splitmovie = movieName.split(',')
  res.render("pages/index", {
    movie1: splitmovie[0],
    movie2: splitmovie[1],
    movie3: splitmovie[2],
    movie4: splitmovie[3]
  })
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let firstMovie = req.query.movie1
  let secondMovie = req.query.movie2
  let thirdMovie = req.query.movie3
  let fourthMovie = req.query.movie4
  res.send('pages/index', {
    movie1: firstMovie,
    movie2: secondMovie,
    movie3: thirdMovie,
    movie4: fourthMovie
  })
});
message = 'Movie could not be found'
app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieName = req.query.name
  fs.readFile('movieDescription.txt', (err, data) => {
    if (data.includes(movieName)){
      res.render("pages/searchResult", {
        name: movieName
      })
      } else {
        res.render("pages/searchResult", {
          name: message
        })
      }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});