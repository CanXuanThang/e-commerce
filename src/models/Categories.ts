import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface CategoryAttributes {
  id: number;
  name: string;
  parentId?: number | null;
}

export interface CategoryCreationAttributes extends Optional<
  CategoryAttributes,
  "id"
> {}

export class Categories
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public parentId?: number | null;
}

Categories.init(
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
      unique: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Categories",
    tableName: "categories",
    timestamps: false,
  },
);
