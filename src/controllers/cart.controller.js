import models from "./../database/models";

export async function createCart(req, res) {
    try {
        const cart = req.session.cart || [];

        const productId = req.query.productId;
        const quantity = req.query.quantity;

        cart.push({ productId, quantity });
        req.session.cart = cart;
        res.status(200).json({ message: "cart saved", cart: req.session.cart });


    } catch (err) {
        res.status(500).json({ error: err.message, err });
    }
}


export const viewCart = async(req,res) => {
    const cart = req.session.cart;
    try{
        let subTotal = 0;
        let items = 0;
        if(!cart){
          return res.status(204).json({error: 'There is no items in the shopping cart'})
        }
        if(cart){
          const productDetails = await Promise.all(
            cart.map(async (item) => {
                const productId = item.productId;
                const qty = item.quantity;
                let productData = await models.Product.findOne({where:{id:productId}});
                let product = productData.toJSON();
                const total = product.price * qty;
                subTotal += total;
                items += qty;
                return {...product,total};
            }))
        const cartItems = [...productDetails];
        res.status(200).json({message:"Cart Items", cartItems, subTotal:`Subtotal (${items} items): ${subTotal}`});
        }
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export const cleanUpCart = (req, res) => {
  req.session.cart=[]
  res.status(200).json({message: 'session exipired'})
  }
