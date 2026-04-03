import { Router } from "express";
import { userController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../schema/user";

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
route.get(path, validate(createUserSchema), userController.getAllUsers);

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
route.get(`${path}/:id`, userController.getUserById);

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
route.post(path, userController.createUser);
route.put(`${path}/:id`, userController.updateUser);
route.get(`${path}/email`, userController.getUserByEmail);
route.delete(`${path}/:id`, userController.deleteUser);

export const userRoute = route;
