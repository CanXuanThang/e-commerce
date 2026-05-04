import sequelize from "../database/database";
import { CartItem } from "../models/CartItem";
import { OrderItem } from "../models/OrderItem";
import { Orders } from "../models/Orders";
import { ProductImage } from "../models/ProductImage";
import { ProductSize } from "../models/ProductSize";
import { ProductVariant } from "../models/ProductVariant";
import { Users } from "../models/Users";
import { ApiError } from "../utils/apiError";

export interface CreateOrderPayload {
  userId: number;
  address: string;
  phone: string;
  orderItems: CreateOrderItemPayload[];
}

interface CreateOrderItemPayload {
  productSizeId: number;
  productVariantId: number;
  quantity: number;
  price: number;
}

const getOrdersByUserId = async (userId: number) => {
  const orders = await Orders.findAll({
    where: { userId },
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          {
            model: ProductVariant,
            as: "variants",
            attributes: ["id", "colorName", "colorCode"],
            include: [
              {
                model: ProductImage,
                as: "images",
                attributes: ["id", "imageUrl", "isPrimary"],
              },
              {
                model: ProductSize,
                as: "sizes",
                attributes: ["id", "size", "quantity", "price"],
              },
            ],
          },
        ],
      },
    ],
  });
  return orders;
};

const createOrder = async (payload: CreateOrderPayload) => {
  return await sequelize.transaction(async (transaction) => {
    let totalAmount = 0;

    const order = await Orders.create(
      {
        userId: payload.userId,
        status: "pending",
        address: payload.address,
        phone: payload.phone,
        totalAmount: 0,
      },
      { transaction },
    );

    for (const item of payload.orderItems) {
      const productSize = await ProductSize.findByPk(item.productSizeId, {
        transaction,
      });

      if (!productSize) {
        throw new ApiError(404, "Product not found");
      }

      if (productSize.quantity < item.quantity) {
        throw new ApiError(400, "Product out of stock");
      }

      totalAmount += productSize.price * item.quantity;

      await OrderItem.create(
        {
          orderId: order.id,
          productSizeId: item.productSizeId,
          quantity: item.quantity,
          price: productSize.price,
          productVariantId: item.productVariantId,
        },
        { transaction },
      );

      await ProductSize.decrement("quantity", {
        by: item.quantity,
        where: { id: item.productSizeId },
        transaction,
      });

      await CartItem.destroy({
        where: {
          sizeId: item.productSizeId,
          id: payload.userId,
          variantId: item.productVariantId,
        },
        transaction,
      });
    }

    await order.update(
      {
        totalAmount,
      },
      { transaction },
    );

    return order;
  });
};

const getAllOrders = async () => {
  return Orders.findAll({
    attributes: {
      exclude: ["userId"],
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

export const orderService = {
  getOrdersByUserId,
  createOrder,
  getAllOrders,
};
