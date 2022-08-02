const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listMoviesInTheaters() {
    return knex("movies as m")
    .join("movies_theaters as t", "t.movie_id", "m.movie_id")
    .select("m.*")
    .where({"t.is_showing": true})
    .groupBy("m.movie_id")
    
}

function read(movieId) {
return knex("movies as m")
.select("*")
.where({movie_id: movieId})
.first()
}

function listTheatersHostingMovie() {
return knex("theaters as t")
.join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
.select("t.*")
.groupBy("t.theater_id")
}

module.exports = {
    list,
    listMoviesInTheaters,
    read,
    listTheatersHostingMovie,
}