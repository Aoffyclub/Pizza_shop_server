const CartItem = require("../models/cart");
const jwt = require("jsonwebtoken");
const Products = require("../models/product");

const addProductToCart = async (req, res) => {
  const { item_id, quantity } = req.body;
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;

  try {
    // Check if item exists in the cart
    const existingCartItems = await CartItem.findOne({
      where: {
        user_id: userId,
        item_id: item_id,
      },
    });

    if (existingCartItems) {
      // Item exists, update the quantity
      await existingCartItems.update({
        quantity: parseFloat(existingCartItems.quantity) + parseFloat(quantity),
        userId,
        item_id,
      });
      res.json({
        message: "Product quantity updated successfully",
      });
    } else {
      await CartItem.create({
        user_id: userId,
        item_id,
        quantity,
      });
      res.json({
        message: "Add a product to cart successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const getCartItems = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;

  try {
    const cartItems = await CartItem.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Products,
          attributes: ["name", "price", "imageUrl"],
        },
      ],
    });

    if (cartItems) {
      let response = [];

      cartItems.forEach((data) => {
        response.push({
          item_id: data.item_id,
          name: data.product.name,
          price: parseFloat(data.product.price),
          imageUrl: data.product.imageUrl,
          quantity: parseFloat(data.quantity),
          totalPrice:
            parseFloat(data.quantity) * parseFloat(data.product.price),
        });
      });

      res.json({
        data: response,
        message: "get cart successfully",
      });
    } else {
      res.json({ message: "Cart is empty" });
    }
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const removeProductFromCart = async (req, res) => {
  const { item_id } = req.body;
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;
  try {
    await CartItem.destroy({
      where: {
        user_id: userId,
        item_id: item_id,
      },
    });
    res.json({ message: "Remove a product from cart successfully" });

  }
  catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

module.exports = { addProductToCart, getCartItems, removeProductFromCart };
