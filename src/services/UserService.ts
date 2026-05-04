import { Users } from "../models/Users";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "user" | "admin";
  isActive?: boolean;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: "user" | "admin";
}

export interface IAuthRequest {
  email: string;
  password: string;
}

const getAllUsers = async () => {
  const users = await Users.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return users;
};

const getUserById = async (id: number) => {
  return Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
};

const createUser = async (user: ICreateUser) => {
  const hashPassword = await bcrypt.hash(user.password, 10);
  return Users.create({
    ...user,
    password: hashPassword,
    isActive: user.isActive ?? true,
  });
};

const updateUser = async (id: number, user: Partial<IUpdateUser>) => {
  const existingUser = await Users.findByPk(id);
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }
  return existingUser.update(user);
};

const deleteUser = async (id: number) => {
  const existingUser = await Users.findByPk(id);
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }
  return existingUser.destroy();
};

const getUserByEmail = async (email: string) => {
  return Users.findOne({ where: { email } });
};

const login = async (payload: IAuthRequest) => {
  const user = await getUserByEmail(payload.email);
  if (!user) {
    throw new ApiError(200, "Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(200, "Invalid email or password");
  }
  const { id, role } = user;

  return {
    accessToken: generateAccessToken({ id, role }),
    refreshToken: generateRefreshToken({ id, role }),
    user: {
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
  };
};

const refreshToken = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY!,
    );
    const { id, role } = decoded;
    return {
      accessToken: generateAccessToken({ id, role }),
      refreshToken: generateRefreshToken({ id, role }),
    };
  } catch (error) {
    throw new ApiError(400, "Invalid refresh token");
  }
};

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  login,
  refreshToken,
};
