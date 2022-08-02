const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const { as } = require("../db/connection");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
  
    const review = await reviewsService.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: `Review cannot be found.` });
  }

  async function update(req, res) {
    const time = new Date().toISOString();
    const reviewId = res.locals.review.review_id;
    const updatedReview = {
      ...req.body.data,
      review_id: reviewId,
    };
  
    await reviewsService.update(updatedReview);
    const info = await reviewsService.updateCritic(reviewId); 
    const data = { ...info[0], created_at: time, updated_at: time};
    res.json({ data });
}

async function destroy(req, res, next) {
   
    await reviewsService.delete(res.locals.review.review_id);
    next({status: 204, message: `204 No Content`})
  }

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}