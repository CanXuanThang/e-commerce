import { Router } from "express";
import { userController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { checkUserEmailSchema, createUserSchema } from "../schema/user";
import { checkIdSchema } from "../schema/common";

const route = Router();
const path = "/users";
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 */
route.get(path, userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lấy user theo id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
route.get(
  `${path}/:id`,
  validate({
    params: checkIdSchema,
  }),
  userController.getUserById,
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
route.post(
  path,
  validate({ body: createUserSchema }),
  userController.createUser,
);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Cập nhật user
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
route.put(
  `${path}/:id`,
  validate({
    body: createUserSchema,
    params: checkIdSchema,
  }),
  userController.updateUser,
);

/**
 * @swagger
 * /users/email:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
route.get(
  `${path}/email`,
  validate({
    query: checkUserEmailSchema,
  }),
  userController.getUserByEmail,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa user theo id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
route.delete(
  `${path}/:id`,
  validate({
    params: checkIdSchema,
  }),
  userController.deleteUser,
);

export const userRoute = route;
