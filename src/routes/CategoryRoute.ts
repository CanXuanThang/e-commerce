import { Router } from "express";
import { categoryController } from "../controllers/CategoryController";
import { validate } from "../middlewares/validate";
import { checkIdSchema } from "../schema/common";
import { createCategorySchema } from "../schema/category";
import { checkRole, verifyToken } from "../middlewares/auth";

const route = Router();
const path = "/categories";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lấy danh sách category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Thành công
 */
route.get(path, categoryController.getAllCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Tạo category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
route.post(
  path,
  validate({ body: createCategorySchema }),
  verifyToken,
  checkRole("admin"),
  categoryController.createCategory,
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Cập nhật category theo id
 *     tags: [Categories]
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
 *               parentId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
route.put(
  `${path}/:id`,
  validate({ params: checkIdSchema, body: createCategorySchema }),
  verifyToken,
  checkRole("admin"),
  categoryController.updateCategory,
);

export const categoryRoute = route;
