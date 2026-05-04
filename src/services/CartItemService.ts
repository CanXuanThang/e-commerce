import { CartItem } from "../models/CartItem";
import { Carts } from "../models/Carts";
import { ProductImage } from "../models/ProductImage";
import { Products } from "../models/Products";
import { ProductSize } from "../models/ProductSize";
import { ProductVariant } from "../models/ProductVariant";
import { ApiError } from "../utils/apiError";

const addProductToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  variantId: number,
  sizeId: number,
  price: number,
) => {
  const existingCartItem = await CartItem.findOne({
    where: { cartId, productId },
  });
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    return existingCartItem.save();
  } else {
    return CartItem.create({
      cartId,
      productId,
      quantity,
      variantId,
      sizeId,
      price,
    });
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
  const items = await CartItem.findAll({
    where: { cartId },
    attributes: ["id", "quantity", "price"],
    include: [
      {
        model: Products,
        as: "product",
        attributes: ["id", "name", "description", "discount"],
      },
      {
        model: ProductSize,
        as: "size",
        attributes: ["id", "size"],
      },
      {
        model: ProductVariant,
        as: "variant",
        attributes: ["id", "colorName", "colorCode"],
        include: [
          {
            model: ProductImage,
            as: "images",
            attributes: ["imageUrl"],
            where: { isPrimary: true },
            limit: 1,
            separate: true,
          },
        ],
      },
    ],
  });

  return items.map((item: any) => {
    const { images, ...rest } = item.variant?.toJSON();
    return {
      id: item.id,
      quantity: item.quantity,
      price: item.price,

      product: item.product,

      variant: {
        ...rest,
        imgUrl: images?.[0]?.imageUrl || null,
      },
      sizeId: item.size?.id,
      size: item.size?.size,
    };
  });
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
