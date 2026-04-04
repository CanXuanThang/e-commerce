import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";
import { Carts } from "./Carts";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id"
> {}

export class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public role?: "user" | "admin";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "users",
  },
);

Users.afterCreate(async (user) => {
  await Carts.create({
    userId: user.id,
  });
});
