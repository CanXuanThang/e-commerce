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
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Thành công
 */
productRoute.get(path, productController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - size
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Áo thun nam"
 *               description:
 *                 type: string
 *                 example: "Áo cotton 100%"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 199000
 *               size:
 *                 type: string
 *                 example: "M"
 *               quantity:
 *                 type: integer
 *                 example: 50
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
productRoute.post(
  path,
  validate({ body: createProductSchema }),
  verifyToken,
  checkRole("admin"),
  productController.createProduct,
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm theo id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
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
 *     summary: Cập nhật sản phẩm theo id
 *     tags: [Products]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               size:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
productRoute.put(
  `${path}/:id`,
  validate({ params: checkIdSchema, body: createProductSchema }),
  verifyToken,
  checkRole("admin"),
  productController.updateProduct,
);

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Lấy sản phẩm theo categoryId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
productRoute.get(
  `${path}/category/:categoryId`,
  //   validate({ params: checkIdSchema }),
  productController.getProductsByCategoryId,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm theo id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
productRoute.delete(
  `${path}/:id`,
  validate({ params: checkIdSchema }),
  verifyToken,
  checkRole("admin"),
  productController.deleteProduct,
);

export default productRoute;
