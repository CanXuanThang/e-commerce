import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface ProductImageAttributes {
  id: number;
  productId: number;
  imageUrl: string;
}

export interface ProductImageCreationAttributes extends Optional<
  ProductImageAttributes,
  "id"
> {}

export class ProductImage
  extends Model<ProductImageAttributes, ProductImageCreationAttributes>
  implements ProductImageAttributes
{
  public id!: number;
  public productId!: number;
  public imageUrl!: string;
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "productimage",
    timestamps: false,
  },
);
