import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface OrderItemAttributes {
  id: number;
  orderId: number;
  productSizeId: number;
  quantity: number;
  price: number;
  productVariantId: number;
}

export interface OrderItemCreationAttributes extends Optional<
  OrderItemAttributes,
  "id"
> {}

export class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public orderId!: number;
  public productSizeId!: number;
  public quantity!: number;
  public price!: number;
  public productVariantId!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productSizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ProductSize",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ProductVariant",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "OrderItem",
    timestamps: false,
  },
);
