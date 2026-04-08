import { Router } from "express";
import { productController } from "../controllers/ProductController";
import { validate } from "../middlewares/validate";
import { createProductSchema } from "../schema/product";
import { checkIdSchema } from "../schema/common";
import { checkRole, verifyToken } from "../middlewares/auth";

const productRoute = Router();
const path = "/products";

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 */
productRoute.get(path, productController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *               - variants
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Áo thun nam"
 *
 *               description:
 *                 type: string
 *                 example: "Cotton 100%"
 *
 *               price:
 *                 type: number
 *                 example: 199000
 *
 *               discount:
 *                 type: number
 *                 example: 10
 *
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - colorName
 *                     - colorCode
 *                     - sku
 *                     - sizes
 *
 *                   properties:
 *                     colorName:
 *                       type: string
 *                       example: Red
 *
 *                     colorCode:
 *                       type: string
 *                       example: "#FF0000"
 *
 *                     sku:
 *                       type: string
 *                       example: TS-RED
 *
 *                     sizes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           size:
 *                             type: string
 *                             example: M
 *
 *                           quantity:
 *                             type: integer
 *                             example: 10
 *
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           imageUrl:
 *                             type: string
 *                             example: https://image.com/a.jpg
 *
 *                           isPrimary:
 *                             type: boolean
 *                             example: true
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRoute.post(
  path,
  verifyToken,
  checkRole("admin"),
  validate({ body: createProductSchema }),
  productController.createProduct,
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product detail by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
productRoute.get(
  `${path}/:id`,
  validate({ params: checkIdSchema }),
  productController.getProductById,
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
productRoute.put(
  `${path}/:id`,
  verifyToken,
  checkRole("admin"),
  validate({ params: checkIdSchema, body: createProductSchema }),
  productController.updateProduct,
);

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by categoryId
 *     tags: [Products]
 */
productRoute.get(
  `${path}/category/:categoryId`,
  productController.getProductsByCategoryId,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
productRoute.delete(
  `${path}/:id`,
  verifyToken,
  checkRole("admin"),
  validate({ params: checkIdSchema }),
  productController.deleteProduct,
);

export default productRoute;
