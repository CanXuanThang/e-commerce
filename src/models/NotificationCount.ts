import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface NotificationCountAttributes {
  id: number;
  count: number;
}

export interface NotificationCountCreationAttributes extends Optional<
  NotificationCountAttributes,
  "id"
> {}

export class NotificationCount
  extends Model<
    NotificationCountAttributes,
    NotificationCountCreationAttributes
  >
  implements NotificationCountAttributes
{
  public id!: number;
  public count!: number;
}

NotificationCount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "NotificationCount",
    tableName: "NotificationCount",
    timestamps: false,
  },
);
