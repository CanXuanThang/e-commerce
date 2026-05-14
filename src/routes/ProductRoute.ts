import { Router } from "express";
import { productController } from "../controllers/ProductController";
import { validate } from "../middlewares/validate";
import {
  createProductDetailsBodySchema,
  createProductSchema,
} from "../schema/product";
import { checkIdSchema } from "../schema/common";
import { checkRole, verifyToken } from "../middlewares/auth";
import { upload } from "../middlewares/uploadImage";
import z from "zod";

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
 *         description: Get product list successfully
 */
productRoute.get(path, productController.getAllProducts);

/**
 * @swagger
 * /products/best-review:
 *   get:
 *     summary: Lấy 10 sản phẩm được đánh giá cao nhẩt
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Get product list successfully
 */
productRoute.get(
  `${path}/best-review`,
  productController.getProductByBestReview,
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *
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
 *
 *               description:
 *                 type: string
 *                 example: Áo thun cotton 100%
 *
 *               discount:
 *                 type: number
 *                 example: 10
 *
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 *
 *       400:
 *         description: Validation error
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
  validate({ body: createProductSchema }),
  productController.createProduct,
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product detail by id
 *     tags: [Products]
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Product detail retrieved successfully
 *
 *       404:
 *         description: Product not found
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
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *
 *               description:
 *                 type: string
 *                 example: Áo thun cotton 100%
 *
 *               discount:
 *                 type: number
 *                 example: 10
 *
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product updated successfully
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
productRoute.put(
  `${path}/:id`,
  verifyToken,
  checkRole("admin"),
  validate({
    params: checkIdSchema,
    body: createProductSchema,
  }),
  productController.updateProduct,
);

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by categoryId
 *     tags: [Products]
 *
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
productRoute.get(
  `${path}/category/:categoryId`,
  validate({
    params: z.object({
      categoryId: z.coerce
        .number()
        .int()
        .positive("ID must be a positive integer"),
    }),
  }),
  productController.getProductsByCategoryId,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
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
 *     summary: Create product variants, sizes and images
 *     tags: [Products]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             required:
 *               - variants
 *
 *             properties:
 *               variants:
 *                 type: string
 *                 description: JSON stringified variants array
 *
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
 *
 *                 items:
 *                   type: string
 *                   format: binary
 *
 *     responses:
 *       200:
 *         description: Product details created successfully
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
productRoute.post(
  `${path}/:productId/details`,
  verifyToken,
  checkRole("admin"),
  upload.array("images", 15),
  validate({
    params: z.object({
      productId: z.coerce
        .number()
        .int()
        .positive("ID must be a positive integer"),
    }),
    body: createProductDetailsBodySchema,
  }),
  productController.createProductDetails,
);

/**
 * @swagger
 * /products/top-selling/{count}:
 *   get:
 *     summary: Lấy các sản phẩm bán chạy nhất
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: count
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get product list successfully
 */

productRoute.get(
  `${path}/top-selling/:count`,
  validate({
    params: z.object({
      count: z.coerce.number().int(),
    }),
  }),
  productController.getTopSellingProducts,
);

export default productRoute;
