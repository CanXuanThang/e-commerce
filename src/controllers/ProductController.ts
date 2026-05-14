import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import {
  CreateProductInput,
  productService,
  VariantInput,
} from "../services/ProductService";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = req?.user?.role;
    const products = await productService.getAllProducts(
      role && role.length > 0 ? role === "admin" : false,
    );

    return response.ok(res, products, "Get all products successfully");
  } catch (error) {
    next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, categoryId, discount }: CreateProductInput =
      req.body;
    const product = await productService.createProduct({
      name,
      description,
      categoryId,
      discount,
    });

    if (!product) {
      return response.serverError(res, null);
    }

    return response.ok(res, product, "Product created successfully");
  } catch (error) {
    next(error);
  }
};

const createProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.productId);

    const variants: VariantInput[] = req.body.variants;

    const files = req.files as Express.Multer.File[];

    if (files?.length) {
      variants.forEach((variant: any) => {
        if (!variant.images?.length) return;

        variant.images = variant.images
          .map((img: any) => {
            const file = files[img.fileIndex];
            if (!file) return null;

            return {
              imageUrl: file.path,
              sortOrder: img.sortOrder ?? 0,
              isPrimary: img.isPrimary ?? false,
            };
          })
          .filter(Boolean);
      });
    }

    await productService.createProductDetails(productId, variants);

    return response.ok(res, null, "Create product details successfully");
  } catch (error) {
    next(error);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Invalid product id");
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return response.notFound(res, null, "Product not found");
    }

    return response.ok(res, product, "Product found successfully");
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Invalid product id");
    }

    const product = await productService.updateProduct(id, req.body);

    return response.ok(res, product, "Product updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Invalid product id");
    }

    await productService.deleteProduct(id);

    return response.ok(res, null, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

const getProductsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = Number(req.params.categoryId);
    const role = req?.user?.role;

    if (!categoryId) {
      return response.badRequest(res, null, "Invalid category id");
    }

    const result = await productService.getProductsByCategoryId(
      categoryId,
      role && role.length > 0 ? role === "admin" : false,
    );

    return response.ok(res, result, "Get products by category id successfully");
  } catch (error) {
    next(error);
  }
};

const getProductByBestReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = req?.user?.role;
    const result = await productService.getProductByBestReview(
      role && role.length > 0 ? role === "admin" : false,
    );

    return response.ok(res, result, "Success !");
  } catch (error) {
    next(error);
  }
};

const getTopSellingProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const count = Number(req.params?.count);
    const result = await productService.getTopSellingProducts(count ?? 5);

    return response.ok(res, result, "Success !");
  } catch (error) {
    next(error);
  }
};

export const productController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  createProductDetails,
  getProductByBestReview,
  getTopSellingProducts,
};
