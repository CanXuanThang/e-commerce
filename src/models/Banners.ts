import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface BannersAttributes {
  id: number;
  imageUrl: string;
  order: number;
}

export interface BannersCreationAttributes extends Optional<
  BannersAttributes,
  "id"
> {}

export class Banners
  extends Model<BannersAttributes, BannersCreationAttributes>
  implements BannersAttributes
{
  public id!: number;
  public imageUrl!: string;
  public order!: number;
}

Banners.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Banners",
    tableName: "banners",
    timestamps: false,
  },
);
