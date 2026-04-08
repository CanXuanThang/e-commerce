import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface ProductImageAttributes {
  id: number;
  variantId: number;
  imageUrl: string;
  sortOrder?: number;
  isPrimary?: boolean;
}

export interface ProductImageCreationAttributes extends Optional<
  ProductImageAttributes,
  "id" | "sortOrder" | "isPrimary"
> {}

export class ProductImage
  extends Model<ProductImageAttributes, ProductImageCreationAttributes>
  implements ProductImageAttributes
{
  public id!: number;
  public variantId!: number;
  public imageUrl!: string;
  public sortOrder!: number;
  public isPrimary!: boolean;
}

ProductImage.init(
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "ProductImage",
    timestamps: false,
  },
);
