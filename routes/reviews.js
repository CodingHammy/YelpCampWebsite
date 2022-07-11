const express = require('express');
const router = express.Router({ mergeParams: true });

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const reviews = require('../controllers/reviews');

const catchAysnc = require('../utilities/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAysnc(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAysnc(reviews.deleteReview));

module.exports = router;