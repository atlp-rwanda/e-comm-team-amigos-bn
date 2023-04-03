import { products } from '../database/models';

const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || id == null)
            return res
                .status(400)
                .json({ message: 'Please insert real product id' });
        const product = await products.findOne({ where: { id } });
        if (!product || product == null)
            return res.status(404).json({ message: 'Product does not exist' });

        if (
            product.userId !== req.user.id &&
            req.user.role !== ('admin' || 'seller')
        )
            return res.status(401).json({ message: 'you are not authorized' });
        req.product = product;
        next();
    } catch (error) {
        return req.status(500).json({ error });
    }
};
