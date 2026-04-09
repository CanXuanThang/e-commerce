import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  variantId: number;
  sizeId: number;
  price: number;
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
  public variantId!: number;
  public sizeId!: number;
  public price!: number;
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
      references: {
        model: "Carts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ProductVariant",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ProductSize",
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CartItems",
    tableName: "CartItems",
    timestamps: false,
  },
);
