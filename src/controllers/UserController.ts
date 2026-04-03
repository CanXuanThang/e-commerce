import { NextFunction } from "express";
import { Request, Response } from "express";
import { response } from "../utils/response";
import { userService } from "../services/UserService";
import { createUserSchema } from "../schema/user";

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();

    return response.ok(res, users, "Get all users successfully");
  } catch (error) {
    console.error("🔥 MESSAGE:", error);
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const user = await userService.getUserById(id);
    if (!user) {
      return response.notFound(res, null, "User not found");
    }
    return response.ok(res, user, "User found successfully");
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await userService.getUserByEmail(req.body.email);
    if (existingUser) {
      return response.badRequest(res, null, "Email already exists");
    }
    const user = await userService.createUser(req.body);
    return response.ok(res, user, "User created successfully");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return response.notFound(res, null, "User not found");
    }

    const user = await userService.updateUser(id, req.body);
    return response.ok(res, user, "User updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return response.notFound(res, null, "User not found");
    }
    await userService.deleteUser(id);
    return response.ok(res, null, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.query.email as string;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return response.notFound(res, null, "User not found");
    }
    return response.ok(res, user, "User found successfully");
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
