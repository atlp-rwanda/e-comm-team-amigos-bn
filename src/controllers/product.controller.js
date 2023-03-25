import Joi from 'joi';
import { Op } from 'sequelize';
import models from '../database/models';
import jwt from 'jsonwebtoken';
import { verifyUuid } from '../utils/verify_uuid';
import {verifyToken} from '../middleware/verifyToken';

export const getAllProduct = async (req, res) => {
    try {
        const listProduct = await models.Product.findAll({
            include: models.User,
        });
        if (listProduct.length <= 0) {
            res.status(404).json({
                Status: 'Not Found',
                error: 'There is no product in Stock',
            });
        } else {
            res.json({
                Status: 'OK',
                Message: 'List of all Products in our collections',
                listProduct,
            }).status(200);
        }
    } catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
};

export const getAvailableProducts = async (req, res) => {
    try {
        const products = await models.Product.findAll({
            where: { available: true },
        });
        res.status(200).json({ response: products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateProductAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body;

        if (typeof available !== 'boolean') {
            return res
                .status(400)
                .json({ error: 'Invalid availability status' });
        }
        const updatedProduct = await models.Product.update(
            { available },
            {
                where: { id },
                returning: true,
            }
        );
        res.json({ updatedProduct, message: 'updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const addProduct = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const sellerId = decodedToken.userId;
        const user = await models.User.findByPk(sellerId);
        if (!user) {
            return res.status(400).json({ message: 'Seller not found' });
        }
        if (
            sellerId !== decodedToken.userId ||
            decodedToken.userRole !== 'vendor'
        ) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const {
            name,
            price,
            quantity,
            available,
            category,
            bonus,
            expiryDate,
            ec,
        } = req.body;
        const images = req.body.images || [];
        const existingProduct = await models.Product.findOne({
            where: { name },
        });
        if (existingProduct) {
            return res.status(409).json({
                message:
                    'Product already exists you can update that product instead',
            });
        }
        const product = await models.Product.create({
            userId: sellerId,
            name,
            price,
            quantity,
            available,
            category,
            bonus,
            images,
            expiryDate,
            ec,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const getAllForSeller = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const sellerId = decodedToken.userId;
        const product = await models.Product.findAll({
            where: {
                userId: sellerId,
            },
        });
        if (product.length > 0) {
            res.status(200).json({
                status: 'OK',
                items: product,
            });
        }
        res.status(404).json({
            status: 'Not Found',
            error: 'There is no item in Collection',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad Request',
            error: error.message,
        });
    }
};
export const searchProduct = async (req, res) => {
    try {
        const { name, minPrice, maxPrice, category } = req.query;
        const where = {};
        if (name) {
            where.name = { [Op.iLike]: `%${name}%` };
        }
        if (minPrice && maxPrice) {
            where.price = { [Op.between]: [minPrice, maxPrice] };
        } else if (minPrice) {
            where.price = { [Op.gte]: minPrice };
        } else if (maxPrice) {
            where.price = { [Op.lte]: maxPrice };
        }
        if (category) {
            where.category = category;
        }

        const products = await models.Product.findAll({
            where,
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        });
        if (products.length <= 0) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'There are no products matching your search',
            });
        }
        return res.status(200).json({
            status: 'Ok',
            message: 'List Of Products matching your search',
            products,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getProduct = async (req, res) => {
    try {
        // Check id
        if (!verifyUuid(req.params.id)) {
            return res.status(400).json({
                status: 'fail',
                message: `Invalid id (${req.params.id})`,
            });
        }

        const product = await models.Product.findByPk(req.params.id, {
            raw: true,
        });

        if (
            req.user &&
            req.user.role === 'vendor' &&
            req.user.id !== product.userId
        ) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not allowed to perform this operation',
            });
        }

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found.',
            });
        }

        if (!product.available) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not available for sale.',
            });
        }

        res.status(200).json({
            status: 'success',
            item: product,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
export async function updateProduct(req, res) {
    try {
        const { name, price, quantity, available, category, bonus, images, expiryDate, ec } = req.body;
        const id = req.params.id;
        const product = await models.Product.findByPk(id);

        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.available = available || product.available;
        product.category = category || product.category;
        product.bonus = bonus || product.bonus;
        product.images = images || product.images;
        product.expiryDate = expiryDate || product.expiryDate;
        product.ec = ec || product.ec;
        product.updatedAt = new Date();

        const newProduct = await product.save();
        if (!newProduct) return res.status(400).json({ error: "could not update this product!", });

        res.status(200).json({ message: "success", data: newProduct.toJSON() });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await verifyToken(req, res, async () => {
            const userId = req.user.id; 
            const productId = req.params.id;

            const product = await models.Product.findOne({
                where: { id: productId, userId },
            });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            await models.Product.destroy({ where: { id: productId } });

            res.status(200).json({
                message: 'deleted successfully',
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    addProduct,
    getAllProduct,
    getProduct,
    addProduct,
    getAllProduct,
    getAvailableProducts,
    updateProductAvailability,
    getAllForSeller,
    deleteProduct
};
