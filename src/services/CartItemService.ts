import { CartItem } from "../models/CartItem";
import { Carts } from "../models/Carts";
import { ApiError } from "../utils/apiError";

const addProductToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
) => {
  const existingCartItem = await CartItem.findOne({
    where: { cartId, productId },
  });
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    return existingCartItem.save();
  } else {
    return CartItem.create({ cartId, productId, quantity });
  }
};

const updateCartItem = async (id: number, quantity: number) => {
  const cartItem = await CartItem.findByPk(id);
  if (!cartItem) {
    throw new ApiError(404, "Cart item not found");
  }
  cartItem.quantity = quantity;
  return cartItem.save();
};

const removeCartItem = async (id: number) => {
  const cartItem = await CartItem.findByPk(id);
  if (!cartItem) {
    throw new ApiError(404, "Cart item not found");
  }
  return cartItem.destroy();
};

const clearCart = async (cartId: number) => {
  return CartItem.destroy({ where: { cartId } });
};

const getCartItemsByCartId = async (cartId: number) => {
  return CartItem.findAll({ where: { cartId } });
};

const getCartByUserId = async (userId: number) => {
  return Carts.findOne({ where: { userId } });
};

export const cartItemService = {
  addProductToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartItemsByCartId,
  getCartByUserId,
};
