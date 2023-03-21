const addToCart = (req,res) => {
    try{
        let cart = {
            productName:"Shoes",
            productId:1,
            productQuantity:3
        };
        res.cookie('cart', JSON.stringify(cart));
        res.status(201).json({message:"item added to cart"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const viewCart = async(req,res) => {
    try{
        let cart ={};
        if(req.cookies.cart){
            cart = await JSON.parse(req.cookies.cart)
        };
        res.status(200).json({message:"Cart retrieved succesfully", response:cart})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export default{
    addToCart,
    viewCart
}