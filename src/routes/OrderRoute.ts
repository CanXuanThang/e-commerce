import { Router } from "express";
import { orderController } from "../controllers/OrderController";
import { checkRole, verifyToken } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createOrderSchema, updateStatusOrder } from "../schema/order";
import { checkIdSchema } from "../schema/common";

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
 *             note: "Giao hàng giờ hành chính"
 *             orderItems:
 *               - productVariantId: 2
 *                 productSizeId: 10
 *                 quantity: 2
 *                 price: 2000000
 *               - productVariantId: 3
 *                 productSizeId: 15
 *                 quantity: 1
 *                 price: 2000000
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

/**
 * @swagger
 * /orders/all:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 */
route.get(
  `${path}/all`,
  verifyToken,
  checkRole("admin"),
  orderController.getAllOrders,
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order by id
 *     tags: [Orders]
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
  orderController.deleteOrder,
);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order by id
 *     tags: [Orders]
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
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled, shipping]
 *     responses:
 *       200:
 *         description: Thành công
 */
route.put(
  `${path}/:id`,
  validate({
    params: checkIdSchema,
    body: updateStatusOrder,
  }),
  verifyToken,
  checkRole("admin"),
  orderController.updateStatusOrder,
);

export const orderRoute = route;
