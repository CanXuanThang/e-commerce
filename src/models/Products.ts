import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  discount: number;
}

export interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  "id" | "description" | "createdAt" | "updatedAt"
> {}

export class Products
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public categoryId!: number;
  public discount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "Products",
    timestamps: false,
  },
);
