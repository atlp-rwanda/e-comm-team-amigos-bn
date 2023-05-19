import dotenv from 'dotenv';
dotenv.config();
// Payment API secret key
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
export const payment = async(req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      orderId: req.body.order.orderId,
      orderProducts: JSON.stringify(req.body.order.orderProducts)
    },
  });
  const line_items = req.body.order.orderProducts.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.images
        },
        unit_amount: item.unitPrice,
      },
      quantity: item.quantity
    };
  });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["RW", "TZ", "KE", "UG"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      customer:customer.id,
      success_url: `${process.env.SUCCESS_URL}/checkout-success`,
      cancel_url: `${process.env.CANCEL_URL}/checkout-cancel`,
    }); 
    res.json({ url: session.url });
  }
