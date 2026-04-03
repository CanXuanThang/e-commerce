import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class Reviews extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public rating!: number;
  public comment?: string;
}

Reviews.init(
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Reviews",
    tableName: "reviews",
    timestamps: false,
  },
);
