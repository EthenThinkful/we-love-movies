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

async function listReviewsAndCritics(req, res, next) {
    
    const criticData = await moviesService.listReviewsAndCritics(req.params.movieId)
    // console.log(data)
    const data = criticData.map((row) => {
        return {review_id: (row.review_id), content: (row.content), score: (row.score), created_at: (row.created_at),
            updated_at: (row.updated_at), critic_id: (row.critic_id), movie_id: (row.movie_id),
            critic: {critic_id: (row.critic_id), preferred_name: (row.preferred_name),
            surname: (row.surname), organization_name: (row.organization_name), created_at: (row.created_at),
            updated_at: (row.updated_at)
        }}
    })
    res.json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    listTheatersHostingMovie,
    listReviewsAndCritics: [asyncErrorBoundary(movieExists), listReviewsAndCritics],
}