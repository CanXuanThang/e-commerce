import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface ProductVariantAttributes {
  id: number;
  productId: number;
  colorName: string;
  colorCode: string;
  sku: string;
  isDefault?: boolean;
}

export interface ProductVariantCreationAttributes extends Optional<
  ProductVariantAttributes,
  "id" | "isDefault"
> {}

export class ProductVariant
  extends Model<ProductVariantAttributes, ProductVariantCreationAttributes>
  implements ProductVariantAttributes
{
  public id!: number;
  public productId!: number;
  public colorName!: string;
  public colorCode!: string;
  public sku!: string;
  public isDefault!: boolean;
}

ProductVariant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
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
    colorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ProductVariant",
    tableName: "ProductVariant",
    timestamps: false,
  },
);
