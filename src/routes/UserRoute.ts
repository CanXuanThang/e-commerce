import { Router } from "express";
import { userController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import {
  checkRequestLoginSchema,
  checkUserEmailSchema,
  createUserSchema,
} from "../schema/user";
import { checkIdSchema } from "../schema/common";
import z from "zod";
import { checkRole, verifyToken } from "../middlewares/auth";

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
route.get(
  path,
  // verifyToken,
  // checkRole("admin"),
  userController.getAllUsers,
);

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
  verifyToken,
  checkRole("admin"),
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
  // validate({ body: createUserSchema }),
  // verifyToken,
  // checkRole("admin"),
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
  verifyToken,
  checkRole("admin"),
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
  verifyToken,
  checkRole("admin"),
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
  verifyToken,
  checkRole("admin"),
  userController.deleteUser,
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Thành công
 */
route.post(
  `/auth/login`,
  validate({ body: checkRequestLoginSchema }),
  userController.login,
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *     responses:
 *       200:
 *         description: Thành công
 */
route.post(
  `/auth/refresh-token`,
  validate({ body: z.string().min(1, "Refresh token is required") }),
  userController.refreshToken,
);

export const userRoute = route;
