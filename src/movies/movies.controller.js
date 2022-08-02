const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const { as } = require("../db/connection");
// function list(req, res, next) {
//     if (req.query.is_showing) {
//         moviesService
//         .listMoviesInTheaters()
//         .then((data) => res.json({data}))
//         .catch(next)
//     } else {
//         moviesService
//         .list()
//         .then((data) => res.json({data}))
//         .catch(next)
//     }
    
// }

async function list(req, res, next) {
    
    if (req.query.is_showing) {
        const data = await moviesService.listMoviesInTheaters()
        res.json({data})
        } else {
        const data = await moviesService.list()
        res.json({data})
    } 
}

function movieExists(req, res, next) {
    moviesService
    .read(req.params.movieId)
    .then((movie) => {
        if (movie) {
            res.locals.movie = movie
            return next()
        }
        next({status: 404, message: `movie cannot be found.`})
    })
    .catch(next)
}

function read(req, res, next) {
    const {movie: data} = res.locals
    res.json({data})
}

async function listTheatersHostingMovie(req, res, next) {
    const data = await moviesService.listTheatersHostingMovie()
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    listTheatersHostingMovie,
}