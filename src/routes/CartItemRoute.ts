import { Router } from "express";
import { cartItemController } from "../controllers/CartItemController";
import { validate } from "../middlewares/validate";
import { cartItemSchema } from "../schema/cartItem";
import { checkIdSchema } from "../schema/common";

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
 * /cart-items/{cartId}:
 *   get:
 *     summary: Lấy danh sách sản phẩm theo cartId
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của giỏ hàng
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
 *               cartId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             required:
 *               - cartId
 *               - productId
 *               - quantity
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
 *               cartId:
 *                 type: integer
 *               productId:
 *                 type: integer
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
 * /carts/{cartId}/cart-items:
 *   delete:
 *     summary: Xóa toàn bộ sản phẩm trong giỏ hàng
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID giỏ hàng
 *     responses:
 *       200:
 *         description: Xóa toàn bộ cart items thành công
 */

cartItemRoute.get(
  `${path}/:cartId`,
  validate({ params: checkIdSchema }),
  cartItemController.getCartItemsByCartId,
);
cartItemRoute.post(
  path,
  validate({ body: cartItemSchema }),
  cartItemController.addProductToCart,
);
cartItemRoute.put(
  `${path}/:id`,
  validate({ params: checkIdSchema, body: cartItemSchema }),
  cartItemController.updateCartItem,
);
cartItemRoute.delete(
  `${path}/:id`,
  validate({ params: checkIdSchema }),
  cartItemController.removeCartItem,
);
cartItemRoute.delete(
  `/carts/:cartId/cart-items`,
  validate({ params: checkIdSchema }),
  cartItemController.clearCart,
);

export default cartItemRoute;
