import express from 'express'
import { createReview } from '../../controllers/review.controller'
import { verifyToken,authorize } from '../../middleware/verifyToken'
import validationOfRatings from '../../validations/review.validation'
const router = express.Router()
router.get('/', async (req, res) => {
    res.json({ Message: 'Your welcome on review page' })
})
router.post(
    '/:productId/review',
    verifyToken,
    authorize(['normal']),
    validationOfRatings,
    createReview
)

export default router
