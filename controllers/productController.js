const { Products} = require("../models/associations");

const createProduct = async (req, res) => {
  const { category_id, name, description, price, imageUrl } = req.body;

  if (!category_id || !name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const maxItemIdResult = await Products.max("product_id");
    const newItemId = maxItemIdResult ? parseFloat(maxItemIdResult) + 1 : 1;
   
    const product = await Products.create({
      category_id,
      name,
      product_id: newItemId,
      description,
      price,
      imageUrl,
    });

    res.status(200).json({
      data: product,
      message: "Create a new product successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({});
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createProduct, getAllProducts };
