import { Router } from "express";
import { productController } from "../controllers/ProductController";
import { validate } from "../middlewares/validate";
import { createProductSchema, variantSchema } from "../schema/product";
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
 *     summary: Create a new product
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
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Áo thun nam
 *               description:
 *                 type: string
 *                 example: Áo thun cotton 100%
 *               discount:
 *                 type: number
 *                 example: 10
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
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

/**
 * @swagger
 * /products/{productId}/details:
 *   post:
 *     summary: Create product details (variants, sizes, images)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - variants
 *             properties:
 *               variants:
 *                 type: string
 *                 description: JSON string of variant array
 *                 example: |
 *                   [
 *                     {
 *                       "colorName": "Red",
 *                       "colorCode": "#ff0000",
 *                       "sku": "RED001",
 *                       "isDefault": true,
 *                       "images": [
 *                         {
 *                           "fileIndex": 0,
 *                           "sortOrder": 1,
 *                           "isPrimary": true
 *                         }
 *                       ],
 *                       "sizes": [
 *                         {
 *                           "size": "M",
 *                           "price": 100000,
 *                           "quantity": 10
 *                         }
 *                       ]
 *                     }
 *                   ]
 *
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload variant images
 *
 *     responses:
 *       200:
 *         description: Product details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Create product details successfully
 *
 *       400:
 *         description: Invalid request body
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
productRoute.post(
  path,
  verifyToken,
  checkRole("admin"),
  validate({ body: variantSchema }),
  productController.createProductDetails,
);

export default productRoute;
