import express from 'express'
import models from '../database/models'
import { confirmPaymentEmail } from '../helpers/confirmPaymentEmail';

const router = express.Router();
// Payment API secret key
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// Stripe webhoook
  router.post(
    "/webhook",
    express.json({ type: "application/json" }),
    async (req, res) => {
      let data = req.body.data.object;
      let eventType = req.body.type;
      // Handle the checkout.session.completed event
      if (eventType === "checkout.session.completed") {
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            try {
              let order = await models.Order.create({
                userId: customer.metadata.userId,
                status: "processing",
                expected_delivery_date: Date.now() + 4 * 24 * 60 * 60 * 1000,
            });
              const products = await JSON.parse(customer.metadata.cartItems);
              confirmPaymentEmail(customer.email, "Payment confirmation", products, customer.id);
              products.forEach(async(element) => {
                await models.OrderProduct.create({
                  orderId: order.id,
                  productId: element.id,
                  quantity: element.quantity,
                  unitPrice: element.price,
                });

                let product = await models.Product.findByPk(element.id);
                product.quantity -= element.quantity;
                if(product.quantity === 0) product.available = false;
                await product.save();
              });
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => console.log(err.message));
      }
      res.status(200).end();
    }
  );
export default router