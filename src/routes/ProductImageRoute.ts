import { Router } from "express";
import { productImageController } from "../controllers/ProductImageController";
import { upload } from "../middlewares/uploadImage";
import { checkRole, verifyToken } from "../middlewares/auth";

const productImageRoute = Router();
const path = "/product-images";

/**
 * @swagger
 * /product-images/{variantId}:
 *   get:
 *     summary: Lấy danh sách ảnh theo variantId
 *     tags: [ProductImages]
 *     parameters:
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của product
 *     responses:
 *       200:
 *         description: Danh sách ảnh của product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       imageUrl:
 *                         type: string
 *                       variantId:
 *                         type: integer
 *                 message:
 *                   type: string
 *                   example: Get images successfully
 */
productImageRoute.get(
  `${path}/:variantId`,
  productImageController.getImagesByVariantId,
);

/**
 * @swagger
 * /product-images:
 *   post:
 *     summary: Upload nhiều ảnh cho product (tối đa 5 ảnh)
 *     tags: [ProductImages]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - variantId
 *               - image
 *             properties:
 *               variantId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Upload ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       imageUrl:
 *                         type: string
 *                 message:
 *                   type: string
 *                   example: Images uploaded successfully
 */
productImageRoute.post(
  `${path}`,
  upload.array("image", 5),
  verifyToken,
  checkRole("admin"),
  productImageController.createProductImages,
);

/**
 * @swagger
 * /product-images/{id}:
 *   delete:
 *     summary: Xóa ảnh product theo id
 *     tags: [ProductImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của image
 *     responses:
 *       200:
 *         description: Xóa ảnh thành công
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
 *                   example: Image deleted successfully
 */
productImageRoute.delete(
  `${path}/:id`,
  verifyToken,
  checkRole("admin"),
  productImageController.deleteProductImage,
);

export default productImageRoute;
