import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface CartAttributes {
  id: number;
  userId: number;
}

export interface CartCreationAttributes extends Optional<
  CartAttributes,
  "id"
> {}

export class Carts
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public userId!: number;
}

Carts.init(
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
  },
  {
    sequelize,
    modelName: "Carts",
    tableName: "Carts",
    timestamps: false,
  },
);
