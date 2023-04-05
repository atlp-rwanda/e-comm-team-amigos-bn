import { Op } from 'sequelize';
import models from '../database/models';
import jwt from 'jsonwebtoken';
import EventEmitter from 'events';
import { verifyUuid } from '../utils/verify_uuid';
import { transformUserRoles } from '../helpers/transformUserRoles';
import { Product } from '../database/models';
import { expiryNot } from '../helpers/createotp';
import { sendingNotification } from '../utils/firebase.admin.util';

const productEvents = new EventEmitter();

export const checkExpiredProducts = async (req, res) => {
    try {
      const expiredProducts = await Product.findAll({
        where: { expiryDate: { [Op.lt]: new Date() } }
      });
  
      await Promise.all(expiredProducts.map(async (product) => {
        await product.update({ available: false });
        await expiryNot(product);
      }));
  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

const PAGE_SIZE = 5; // Number of products per page
export const getAllProduct = async (req, res) => {
    const { page } = req.query; // Current page number

    // Convert page parameter to integer or use 1 as default
    const currentPage = parseInt(page) || 1;

    // Calculate offset and limit for the current page
    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
    try {
        const listProduct = await models.Product.findAll({
            include: models.User,
            limit: limit,
            offset: offset,
        });
        if (listProduct.length <= 0) {
            res.status(404).json({
                Status: 'Not Found',
                error: 'There is no product in Stock',
            });
        } else {
            // Calculate total number of products and pages
            const totalCount = await models.Product.count();
            const totalPages = Math.ceil(totalCount / PAGE_SIZE);
            // Generate pagination links for previous and next pages
            const prevPage = currentPage > 1 ? currentPage - 1 : null;
            const nextPage = currentPage < totalPages ? currentPage + 1 : null;

            const responseData = {
                currentPage: currentPage,
                totalPages: totalPages,
                previousPage: prevPage,
                nextPage: nextPage,
                listProduct: listProduct,
            };
            res.json({
                Status: 'OK',
                Message: 'List of all Products in our collections',
                responseData,
            }).status(200);
        }
    } catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
};

export const getAvailableProducts = async (req, res) => {
    const { page } = req.query; // Current page number

    // Convert page parameter to integer or use 1 as default
    const currentPage = parseInt(page) || 1;

    // Calculate offset and limit for the current page
    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
    try {
        const products = await models.Product.findAll({
            where: { available: true },
            offset: offset,
            limit: limit,
        });
        // Calculate total number of products and pages
        const totalCount = await models.Product.count();
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        // Generate pagination links for previous and next pages
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const responseData = {
            currentPage: currentPage,
            totalPages: totalPages,
            previousPage: prevPage,
            nextPage: nextPage,
            products: products,
        };
        res.status(200).json({ response: responseData });
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
            userId: req.user.id,
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
        productEvents.emit('added', product, req.user.id);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

export const getAllForSeller = async (req, res) => {
    const { page } = req.query; // Current page number

    // Convert page parameter to integer or use 1 as default
    const currentPage = parseInt(page) || 1;

    // Calculate offset and limit for the current page
    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
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
            offset: offset,
            limit: limit,
        });
        if (product.length > 0) {
            // Calculate total number of products and pages
            const totalCount = await models.Product.count();
            const totalPages = Math.ceil(totalCount / PAGE_SIZE);
            // Generate pagination links for previous and next pages
            const prevPage = currentPage > 1 ? currentPage - 1 : null;
            const nextPage = currentPage < totalPages ? currentPage + 1 : null;
            const responseData = {
                currentPage: currentPage,
                totalPages: totalPages,
                previousPage: prevPage,
                nextPage: nextPage,
                product: product,
            };
            res.status(200).json({
                status: 'OK',
                items: responseData,
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
    const { page } = req.query; // Current page number

    // Convert page parameter to integer or use 1 as default
    const currentPage = parseInt(page) || 1;

    // Calculate offset and limit for the current page
    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
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
            offset: offset,
            limit: limit,
        });
        if (products.length <= 0) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'There are no products matching your search',
            });
        }
        // Calculate total number of products and pages
        const totalCount = await models.Product.count();
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        // Generate pagination links for previous and next pages
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const responseData = {
            currentPage: currentPage,
            totalPages: totalPages,
            previousPage: prevPage,
            nextPage: nextPage,
            products: products,
        };
        return res.status(200).json({
            status: 'Ok',
            message: 'List Of Products matching your search',
            responseData,
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

        if (req.user) {
            const userRoles = transformUserRoles(req.user.UserRoles);
            if (
                userRoles.includes('Merchant') &&
                req.user.id !== product.userId
            ) {
                return res.status(403).json({
                    status: 'fail',
                    message: 'You are not allowed to perform this operation',
                });
            }
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
        const {
            name,
            price,
            quantity,
            available,
            category,
            bonus,
            images,
            expiryDate,
            ec,
        } = req.body;
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
        if (!newProduct)
            return res
                .status(400)
                .json({ error: 'could not update this product!' });
        productEvents.emit('updated', product, req.user.id);
        res.status(200).json({ message: 'success', data: newProduct.toJSON() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const userRoles = transformUserRoles(req.user.UserRoles) 

        const product = await models.Product.findOne({
            where: { id: productId, ...(!userRoles.includes('Admin') && userId)},
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await models.Product.destroy({ where: { id: productId } });
        productEvents.emit('deleted', product, userId);
        res.status(200).json({
            message: 'deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProductByAdmin = async (req, res) => {
    try {
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
        const { sellerId } = req.params;
        const product = await models.Product.create({
            userId: sellerId, // set vendor ID as the user ID for the product
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
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

// Listen for the "added" event
productEvents.on('added', (product, userId) => {
sendingNotification(userId, {
    title: 'Added product',
    body: 'Hi, you have added product to amigos e-store',
    productId: product.id
});
});

// Listen for the "added" event
productEvents.on('update', (product, userId) => {
    sendingNotification(userId, {
        title: 'Updated product',
        body: 'Hi, you have updated product from amigos store',
        productId: product.id
    });
});


// Listen for the "removed" event
productEvents.on('deleted', (product, userId) => {
    sendingNotification(userId, {
        title: 'Deleted product',
        body: 'Hi, you have updated product from amigos store',
        productId: product.id
    });
});

export default {
    addProduct,
    getAllProduct,
    getProduct,
    addProduct,
    getAllProduct,
    getAvailableProducts,
    updateProductAvailability,
    getAllForSeller,
    deleteProduct,
    addProductByAdmin
};
