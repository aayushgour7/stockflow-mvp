const { Product } = require("../models");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      quantity,
      costPrice,
      sellingPrice,
      lowStockThreshold,
    } = req.body;

    const product = await Product.create({
      name,
      sku,
      description,
      quantity,
      costPrice,
      sellingPrice,
      lowStockThreshold,
      organizationId: req.user.organizationId,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

const whereClause = {
  organizationId: req.user.organizationId,
};

if (search) {
  whereClause[Op.or] = [
    {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
    {
      sku: {
        [Op.like]: `%${search}%`,
      },
    },
  ];
}
    const products = await Product.findAll({
  where: whereClause,
  order: [["createdAt", "DESC"]],
});

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id,
        organizationId: req.user.organizationId,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.update(req.body);

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id,
        organizationId: req.user.organizationId,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.destroy();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
   updateProduct,
  deleteProduct,
};