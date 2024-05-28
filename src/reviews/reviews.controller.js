const reviewsService = require("./reviews.service")

async function validateReview(req, res, next) {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId);

    if(review){
        res.locals.review = review;
        return next();
    }
    next({
        status:404, 
        message:`cannot be found: ${reviewId}`
    });
}

async function update(req, res, next) {

    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };

     await reviewsService.update(updatedReview);

     res.json({ data: await reviewsService.read(updatedReview.review_id) });
}

async function destroy(req, res, next){
    reviewsService.delete(res.locals.review.review_id)
        .then(() => res.sendStatus(204))
        .catch(next);
}


module.exports = {
    update: [validateReview, update],
    delete: [validateReview, destroy],
}