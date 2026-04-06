import { Categories } from "../models/Categories";
import { ApiError } from "../utils/apiError";

const getAll = async () => {
  return Categories.findAll();
};

const getCategoryByName = async (name: string) => {
  return Categories.findOne({ where: { name } });
};

const createCategory = async (payload: { name: string; parentId?: number }) => {
  const existingCategory = await getCategoryByName(payload.name);
  if (existingCategory) {
    throw new ApiError(400, "Category name already exists");
  }
  return Categories.create(payload);
};

const updateCategory = async (
  id: number,
  payload: { name?: string; parentId?: number },
) => {
  const category = await Categories.findByPk(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  if (payload.name) {
    const existingCategory = await getCategoryByName(payload.name);
    if (existingCategory && existingCategory.id !== id) {
      throw new ApiError(400, "Category name already exists");
    }
  }
  return category.update(payload);
};

export const categoryService = {
  getAll,
  getCategoryByName,
  createCategory,
  updateCategory,
};
