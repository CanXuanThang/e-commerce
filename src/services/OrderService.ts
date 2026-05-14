import { cast, col, fn, Op } from "sequelize";
import { getIO } from "../config/socket";
import sequelize from "../database/database";
import { CartItem } from "../models/CartItem";
import { OrderItem } from "../models/OrderItem";
import { Orders } from "../models/Orders";
import { ProductImage } from "../models/ProductImage";
import { ProductSize } from "../models/ProductSize";
import { ProductVariant } from "../models/ProductVariant";
import { Users } from "../models/Users";
import { ApiError } from "../utils/apiError";
import { notificationCount } from "./NotificationCount";

export interface CreateOrderPayload {
  userId: number;
  address: string;
  phone: string;
  orderItems: CreateOrderItemPayload[];
  note?: string;
}

interface CreateOrderItemPayload {
  productSizeId: number;
  productVariantId: number;
  quantity: number;
  price: number;
}

const getOrdersByUserId = async (userId: number) => {
  const orders = await Orders.findAll({
    // không trả ra các order đã hoàn thành giao hàng
    where: { userId: userId, status: { [Op.ne]: "completed" } },
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
        note: payload.note,
      },
      { transaction },
    );

    for (const item of payload.orderItems) {
      const productSize = await ProductSize.findByPk(item.productSizeId, {
        transaction,
      });

      if (!productSize) {
        throw new ApiError(200, "Product not found");
      }

      if (productSize.quantity < item.quantity) {
        throw new ApiError(200, "Product out of stock");
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
          cartId: payload.userId,
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

    const io = getIO();
    const count = await notificationCount.updateCount();

    io.to("admin_room").emit("notification_count_updated", {
      message: "Có đơn hàng mới",
      count: count,
    });

    return order;
  });
};

const getAllOrders = async () => {
  return Orders.findAll({
    attributes: {
      exclude: ["userId"],
      include: [
        [cast(fn("SUM", col("items.quantity")), "SIGNED"), "totalQuantity"],
      ],
    },

    include: [
      {
        model: Users,
        as: "user",
        attributes: ["name", "email", "phone"],
      },

      {
        model: OrderItem,
        as: "items",
        attributes: [],
      },
    ],

    group: ["Orders.id", "user.id"],
  });
};

const deleteOrder = async (id: number) => {
  const order = await Orders.findByPk(id);
  if (!order) {
    throw new ApiError(200, "Order not found !");
  }

  return order.destroy();
};

const updateStattusOrder = async (
  id: number,
  status: "pending" | "completed" | "cancelled" | "shipping",
) => {
  const order = await Orders.findByPk(id);

  if (!order) {
    throw new ApiError(200, " Order not found !");
  }

  const validStatus = ["pending", "completed", "cancelled", "shipping"];

  if (!validStatus.includes(status)) {
    throw new ApiError(200, "Invalid status");
  }

  return order.update({ status });
};

export const orderService = {
  getOrdersByUserId,
  createOrder,
  getAllOrders,
  deleteOrder,
  updateStattusOrder,
};
