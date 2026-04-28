import { Router } from "express";
import { orderController } from "../controllers/OrderController";
import { verifyToken } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createOrderSchema } from "../schema/order";

const route = Router();
const path = "/orders";

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get orders by logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       401:
 *         description: Unauthorized
 */
route.get(path, verifyToken, orderController.getOrdersByUserId);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *           example:
 *             address: "123 Hoan Kiem, Ha Noi"
 *             phone: "0987654321"
 *             orderItems:
 *               - productVariantId: 2
 *                 productSizeId: 10
 *                 quantity: 2
 *               - productVariantId: 3
 *                 productSizeId: 15
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
route.post(
  path,
  verifyToken,
  validate({ body: createOrderSchema }),
  orderController.createOrder,
);

export const orderRoute = route;
