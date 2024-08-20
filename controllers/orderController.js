const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");
const { Order, OrderItem, Products } = require("../models/associations");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;

    const { address_id, totalPrice, products } = req.body;
    const transaction = await sequelize.transaction();

    try {
      // Step 1: Create the Order
      const newOrder = await Order.create(
        {
          order_id: uuidv4(),
          user_id: userId,
          address_id: address_id,
          totalPrice: totalPrice,
        },
        { transaction }
      );

      console.log(newOrder);

      // Step 2: Create Order Items
      const orderItems = products.map((product) => ({
        order_id: newOrder.order_id, // Use the correct key
        product_id: product.product_id,
        quantity: product.quantity,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction });

      // Step 3: Commit the transaction
      await transaction.commit();

      res.json({
        success: true,
        message: "Order created successfully",
        order_id: newOrder.order_id,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({
        success: false,
        message: "Order creation failed",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const getOrders = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;
    const orders = await Order.findAll({
      where: { user_id: userId },
      attributes: ["order_id", "address_id", "totalPrice"],
      include: [
        {
          model: OrderItem,
          attributes: ["product_id", "quantity"],
          include: [
            {
              model: Products,
              attributes: ["name", "description", "price", "imageUrl"],
            },
          ],
        },
      ],
    });
    res.json({ data: orders, message: "get orders success" });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

module.exports = { createOrder, getOrders };
