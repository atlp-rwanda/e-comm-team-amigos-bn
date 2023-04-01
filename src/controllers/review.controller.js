import models from '../database/models';

export const createReview = async (req, res) => {
    const { productId } = req.params;
    try {
        const existReview = await models.Review.findOne({
            where: {
                userId: req.user.id,
                productId: productId,
            },
        });
        if (existReview) {
            return res
                .status(400)
                .json({ message: 'You have already rated this product' });
        }
        const product = await models.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const newReview = await models.Review.create({
            userId: req.user.id,
            productId: productId,
            rate: req.body.rate,
            feedback: req.body.feedback,
        });
        res.status(201).json({
            message: 'Review Created Successfully',
            Review: newReview,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
