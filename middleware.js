const Listing = require("./models/listing")
const ExpressError = require("./utils/expressError.js")
const { listingSchema, reviewSchema } = require("./schema.js")
const Review = require("./models/review.js")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You must be logged in to create listings!")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not owner of this listing")
        return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.validListing = (req, res, next) => {
    let result = listingSchema.validate(req.body)
    if (result.error) {
        throw new ExpressError(400, result.error)
    }
    else {
        next()
    }
}

module.exports.validReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body)
    if (result.error) {
        throw new ExpressError(400, result.error)
    }
    else {
        next()
    }
}

module.exports.isReviwAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params
    let review = await Review.findById(reviewId)
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not owner of this review")
        return res.redirect(`/listings/${id}`)
    }
    next()
}
