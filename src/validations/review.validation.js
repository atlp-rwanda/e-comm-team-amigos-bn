import Joi from 'joi'

const ReviewSchema = Joi.object({
    rate: Joi.number().min(1).max(5).required(),
    feedback: Joi.string().required().min(10).max(100),
})
const validateReviews = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })
const reviewsValidation = validateReviews(ReviewSchema)
const validationOfReviews = (req, res, next) => {
    try {
        const { error } = reviewsValidation(req.body)
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details.map((detail) =>
                    detail.message.replace(/[^a-zA-Z0-9 ]/g, '')
                ),
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal Server error',
        })
    }
}
export default validationOfReviews
