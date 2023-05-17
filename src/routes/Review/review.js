import express from 'express';
import { createReview, getReviews } from '../../controllers/review.controller';
import { verifyToken, authorize } from '../../middleware/verifyToken';
import validationOfRatings from '../../validations/review.validation';
const router = express.Router();
router.get('/', async (req, res) => {
    res.json({ Message: 'Your welcome on review page' });
});
router.post(
    '/:productId/review',
    verifyToken,
    authorize(['Customer']),
    validationOfRatings,
    createReview
);

router.get('/:productId/review', getReviews);

export default router;
