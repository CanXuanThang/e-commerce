import { Router } from "express";
import { cartItemController } from "../controllers/CartItemController";
import { validate } from "../middlewares/validate";
import { cartItemSchema } from "../schema/cartItem";
import { checkIdSchema } from "../schema/common";
import { verifyToken } from "../middlewares/auth";
import z from "zod";

const cartItemRoute = Router();
const path = "/cart-items";

/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: API quản lý sản phẩm trong giỏ hàng
 */

/**
 * @swagger
 * /cart-items:
 *   get:
 *     summary: Lấy danh sách sản phẩm theo userId
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: Lấy danh sách cart items thành công
 */

/**
 * @swagger
 * /cart-items:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               variantId:
 *                 type: integer
 *               sizeId:
 *                 type: integer
 *               price:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *               - variantId
 *               - sizeId
 *               - price
 *     responses:
 *       201:
 *         description: Thêm sản phẩm vào giỏ thành công
 */

/**
 * @swagger
 * /cart-items/{id}:
 *   put:
 *     summary: Cập nhật cart item
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật cart item thành công
 */

/**
 * @swagger
 * /cart-items/{id}:
 *   delete:
 *     summary: Xóa 1 sản phẩm khỏi giỏ hàng
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID cart item
 *     responses:
 *       200:
 *         description: Xóa cart item thành công
 */

/**
 * @swagger
 * /carts/delete-all:
 *   delete:
 *     summary: Xóa toàn bộ sản phẩm trong giỏ hàng
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: Xóa toàn bộ cart items thành công
 */

cartItemRoute.get(path, verifyToken, cartItemController.getCartItemsByCartId);
cartItemRoute.post(
  path,
  validate({ body: cartItemSchema }),
  verifyToken,
  cartItemController.addProductToCart,
);
cartItemRoute.put(
  `${path}/:id`,
  validate({
    params: checkIdSchema,
    body: z.object({
      quantity: z
        .number()
        .int()
        .min(1, "Quantity than more 1")
        .positive("Quantity must be a positive integer"),
    }),
  }),
  verifyToken,
  cartItemController.updateCartItem,
);
cartItemRoute.delete(
  `${path}/:id`,
  validate({ params: checkIdSchema }),
  verifyToken,
  cartItemController.removeCartItem,
);
cartItemRoute.delete(
  `/carts/delete-all`,
  verifyToken,
  cartItemController.clearCart,
);

export default cartItemRoute;
