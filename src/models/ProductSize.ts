import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface ProductSizeAttributes {
  id: number;
  variantId: number;
  size: string;
  quantity: number;
  price: number;
}

export interface ProductSizeCreationAttributes extends Optional<
  ProductSizeAttributes,
  "id"
> {}

export class ProductSize
  extends Model<ProductSizeAttributes, ProductSizeCreationAttributes>
  implements ProductSizeAttributes
{
  public id!: number;
  public variantId!: number;
  public size!: string;
  public quantity!: number;
  public price!: number;
}

ProductSize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
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
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "ProductSize",
    tableName: "ProductSize",
    timestamps: false,
  },
);
