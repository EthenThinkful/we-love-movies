const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const { as } = require("../db/connection");

async function list(req, res) {
    
    
    const theaters = await theatersService.list()
    const theatersAndMovies = []
    for (let i = 0; i < theaters.length; i++) {
        const theater = theaters[i]
        const { theater_id } = theater
        const movie = await theatersService.getMovies
        (theater_id)
        const movieToPush = {...theater, movies: movie }
        theatersAndMovies.push(movieToPush)
    }
    // const data = theaterMoviesData.map((row) => {
    //     return {theater_id: (row.theater_id), name: (row.name), address_line_1: (row.address_line_1), address_line_2: (row.address_line_2),
    //         city: (row.city), state: (row.state), zip: (row.zip), created_at: (row.created_at), updated_at: (row.updated_at),
    //         movies: {movie_id: (row.movie_id), title: (row.title), runtime_in_minutes: (row.runtime_in_minutes),
    //         rating: (row.rating), description: (row.description), image_url: (row.image_url),
    //         created_at: (row.created_at), updated_at: (row.updated_at), is_showing: (row.is_showing),
    //         theater_id: (row.theater_id)
    //     }}
    // })
    res.json({data: theatersAndMovies})
}

module.exports = {
   list: asyncErrorBoundary(list),
}