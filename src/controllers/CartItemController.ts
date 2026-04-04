import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import { cartItemService } from "../services/CartItemService";

const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cartItem = await cartItemService.addProductToCart(
      cartId,
      productId,
      quantity,
    );
    return response.ok(res, cartItem, "Product added to cart successfully");
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
    const cartId = parseInt(req.params.cartId as string);
    if (isNaN(cartId)) {
      return response.badRequest(res, null, "Invalid cart ID");
    }
    await cartItemService.clearCart(cartId);
    return response.ok(res, null, "Cart cleared successfully");
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
    const cartId = parseInt(req.params.cartId as string);
    if (isNaN(cartId)) {
      return response.badRequest(res, null, "Invalid cart ID");
    }
    const cartItems = await cartItemService.getCartItemsByCartId(cartId);
    return response.ok(res, cartItems, "Get cart items successfully");
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
