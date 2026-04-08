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
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
