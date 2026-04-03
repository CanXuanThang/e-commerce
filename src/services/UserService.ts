import { Users } from "../models/Users";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "user" | "admin";
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: "user" | "admin";
}
const getAllUsers = async () => {
  return Users.findAll();
};
const getUserById = async (id: number) => {
  return Users.findByPk(id);
};
const createUser = async (user: ICreateUser) => {
  return Users.create(user);
};
const updateUser = async (id: number, user: Partial<IUpdateUser>) => {
  const existingUser = await Users.findByPk(id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  return existingUser.update(user);
};
const deleteUser = async (id: number) => {
  const existingUser = await Users.findByPk(id);
  if (!existingUser) {
    throw new Error("User not found");
  }
  return existingUser.destroy();
};
const getUserByEmail = async (email: string) => {
  return Users.findOne({ where: { email } });
};

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
