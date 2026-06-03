const { Product, Setting } = require("../models");

const getDashboard = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const products = await Product.findAll({
      where: {
        organizationId,
      },
    });

    const settings = await Setting.findOne({
      where: {
        organizationId,
      },
    });

    const defaultThreshold =
      settings?.defaultLowStockThreshold || 5;

    const totalProducts = products.length;

    const totalInventory = products.reduce(
      (sum, product) => sum + (product.quantity || 0),
      0
    );

    const lowStockItems = products
  .filter((product) => {
    const threshold =
      product.lowStockThreshold ?? defaultThreshold;

    return product.quantity <= threshold;
  })
  .map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    quantity: product.quantity,
    lowStockThreshold:
      product.lowStockThreshold ?? defaultThreshold,
  }));

    return res.status(200).json({
      totalProducts,
      totalInventory,
      lowStockItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getDashboard,
};