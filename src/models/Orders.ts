import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface OrderAttributes {
  id: number;
  userId: number;
  totalAmount: number;
  status: "pending" | "completed" | "cancelled" | "shipping";
  address: string;
  phone: string;
  createdAt: Date;
}

export interface OrderCreationAttributes extends Optional<
  OrderAttributes,
  "id" | "createdAt"
> {}

export class Orders
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
  public status!: "pending" | "completed" | "cancelled" | "shipping";
  public address!: string;
  public phone!: string;
  public createdAt!: Date;
}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled", "shipping"),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Orders",
    tableName: "Orders",
    timestamps: false,
  },
);
