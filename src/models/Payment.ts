import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface PaymentAttributes {
  id: number;
  orderId: number;
  method: "momo" | "paypal" | "credit_card";
  status: "pending" | "completed" | "failed";
}

export interface PaymentCreationAttributes extends Optional<
  PaymentAttributes,
  "id"
> {}

export class Payments
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public orderId!: number;
  public method!: "momo" | "paypal" | "credit_card";
  public status!: "pending" | "completed" | "failed";
}

Payments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("momo", "paypal", "credit_card"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payments",
    tableName: "Payments",
    timestamps: false,
  },
);
