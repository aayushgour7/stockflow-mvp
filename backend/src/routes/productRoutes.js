const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

router.post(
  "/",
  authMiddleware,
  productController.createProduct
);

router.get(
  "/",
  authMiddleware,
  productController.getProducts
);

router.put(
  "/:id",
  authMiddleware,
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  productController.deleteProduct
);

module.exports = router;