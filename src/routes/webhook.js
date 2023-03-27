import express from 'express'
import models from '../database/models'

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
              const order = await models.Order.findOne({
                where: {id: customer.metadata.orderId},
              });
              order.status = 'processing'
              await order.save();
              customer.metadata.orderProducts.forEach(async(element) => {
                let product = await models.Product.findByPk(element.id);
                product.quantity -= element.quantity;
                if(product.quantity === 0) product.availability = false;
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