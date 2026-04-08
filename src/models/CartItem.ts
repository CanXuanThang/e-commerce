import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface CartItemCreationAttributes extends Optional<
  CartItemAttributes,
  "id"
> {}

export class CartItem
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    tableName: "cart_items",
    timestamps: false,
  },
);
