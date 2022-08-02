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

function listReviewsAndCritics(movieId) {
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .select("c.*", "r.*")
    .where({"m.movie_id": movieId})
}

module.exports = {
    list,
    listMoviesInTheaters,
    read,
    listTheatersHostingMovie,
    listReviewsAndCritics,
}