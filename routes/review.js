const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const {validReview, isLoggedIn, isReviwAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js")

// review route
router.post("/", isLoggedIn,validReview,wrapAsync (reviewController.createReview))

// review delete route
router.delete("/:reviewId", isLoggedIn ,isReviwAuthor ,wrapAsync (reviewController.destroyReview))

module.exports = router