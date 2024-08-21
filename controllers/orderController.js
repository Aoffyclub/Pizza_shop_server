const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");
const {
  Order,
  OrderItem,
  Products,
  CartItem,
  Address,
} = require("../models/associations");
const Admin = require("../models/admin");
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

      // Step 2: Create Order Items
      const orderItems = products.map((product) => ({
        order_id: newOrder.order_id, // Use the correct key
        product_id: product.product_id,
        quantity: product.quantity,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction });

      // Step 3: Update Cart Items
      await CartItem.destroy({
        where: { user_id: userId },
        transaction,
      });

      // Step 4: Commit the transaction
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
      attributes: ["order_id", "address_id", "totalPrice", "status"],
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

const getOrderById = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;
    const { id } = req.params;
    const order = await Order.findOne({
      where: { user_id: userId, order_id: id },
      attributes: ["order_id", "totalPrice", "status", "createdAt"],
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
        {
          model: Address,
          attributes: ["address", "city", "province", "zipCode", "phoneNumber"],
        },
      ],
    });
    res.json({ data: order, message: "get order by ID successfully" });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const paymentOrder = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;
    const { order_id, status } = req.body;

    const order = await Order.update(
      { status },
      { where: { user_id: userId, order_id: order_id } }
    );

    res.json({ message: "Pay order successfully and wait to check payment" });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const cancelOrder = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;
    const { order_id, status } = req.body;

    const order = await Order.update(
      { status },
      { where: { user_id: userId, order_id: order_id } }
    );

    res.json({ message: "Cancel order successfully" });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const getAllOrder = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const adminId = decoded.admin_id;

    if (adminId) {
      // Fix the if condition to check for adminId
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const orders = await Order.findAll({});
      res.json({ data: orders, message: "Get all orders successfully" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  paymentOrder,
  cancelOrder,
  getAllOrder,
};
