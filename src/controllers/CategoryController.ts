import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { response } from "../utils/response";

const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryService.getAll();

    return response.ok(res, categories, "Get all categories successfully");
  } catch (error) {
    next(error);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingCategory = await categoryService.getCategoryByName(
      req.body.name,
    );
    if (existingCategory) {
      return response.ok(res, null, "Category name already exists");
    }

    const id = parseInt(req.body.parentId);
    if (id) {
      const parentCategory = await categoryService.findById(req.body.parentId);
      if (!parentCategory) {
        return response.ok(res, null, "Parent category not found");
      }
    }

    const category = await categoryService.createCategory(req.body);
    return response.ok(res, category, "Category created successfully");
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    const existingCategory = await categoryService.getCategoryByName(
      req.body.name,
    );
    if (existingCategory && existingCategory.id !== id) {
      return response.ok(res, null, "Category name already exists");
    }

    const category = await categoryService.updateCategory(id, req.body);
    return response.ok(res, category, "Category updated successfully");
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    if (id) {
      const parentCategory = await categoryService.findById(id);
      if (!parentCategory) {
        return response.ok(res, null, "Parent category not found");
      }

      return response.ok(res, parentCategory, "Success !");
    }

    return response.ok(res, null, "CategoryId is required!");
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategoryById,
};
