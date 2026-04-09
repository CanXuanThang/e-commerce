import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import { cartItemService } from "../services/CartItemService";
import { productSizeService } from "../services/ProductSizeService";

const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, quantity, variantId, sizeId, price } = req.body;
    const userId = req.user?.id;
    if (userId) {
      const cart = await cartItemService.getCartByUserId(userId);
      if (cart) {
        const checkQuantity = await productSizeService.checkQuantityById(
          productId,
          quantity,
        );

        if (!checkQuantity) {
          return response.conflict(res, "Not enough stock available");
        }

        const cartItem = await cartItemService.addProductToCart(
          cart.id,
          productId,
          quantity,
          variantId,
          sizeId,
          price,
        );
        return response.ok(res, cartItem, "Product added to cart successfully");
      }
    }
    return response.notFound(res, null, "Not found cart by user !");
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return response.badRequest(res, null, "Invalid cart item ID");
    }
    const { quantity } = req.body;
    const cartItem = await cartItemService.updateCartItem(id, quantity);
    return response.ok(res, cartItem, "Cart item updated successfully");
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return response.badRequest(res, null, "Invalid cart item ID");
    }
    await cartItemService.removeCartItem(id);
    return response.ok(res, null, "Cart item removed successfully");
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return response.badRequest(res, null, "Invalid cart ID");
    }
    const cart = await cartItemService.getCartByUserId(userId);
    if (cart) {
      await cartItemService.clearCart(cart.id);
      return response.ok(res, null, "Cart cleared successfully");
    }
    return response.notFound(res, null, "Not found cart by user !");
  } catch (error) {
    next(error);
  }
};

const getCartItemsByCartId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return response.badRequest(res, null, "Invalid cart ID");
    }

    const cart = await cartItemService.getCartByUserId(userId);
    if (cart) {
      const cartItems = await cartItemService.getCartItemsByCartId(cart.id);
      return response.ok(res, cartItems, "Get cart items successfully");
    }

    return response.notFound(res, null, "Not found cart by user !");
  } catch (error) {
    next(error);
  }
};

export const cartItemController = {
  addProductToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartItemsByCartId,
};
