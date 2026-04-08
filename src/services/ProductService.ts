import { Categories } from "../models/Categories";
import { ProductImage } from "../models/ProductImage";
import { Products } from "../models/Products";
import { ApiError } from "../utils/apiError";
import sequelize from "../database/database";
import { ProductVariant } from "../models/ProductVariant";
import { ProductSize } from "../models/ProductSize";
import { CreateSize } from "./ProductSizeService";

export interface ImageInput {
  imageUrl: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface VariantInput {
  colorName: string;
  colorCode: string;
  sku: string;
  sizes: CreateSize[];
  images?: ImageInput[];
  isDefault?: boolean;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  categoryId: number;
  discount: number;
}

// ================= GET ALL PRODUCTS =================

const getAllProducts = async () => {
  try {
    return Products.findAll({
      attributes: ["id", "name", "discount"],
      include: [
        {
          model: Categories,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: ProductVariant,
          as: "variants",
          attributes: ["id", "colorName", "colorCode"],
          include: [
            {
              model: ProductImage,
              as: "images",
              attributes: ["id", "imageUrl", "isPrimary"],
            },
            {
              model: ProductSize,
              as: "sizes",
              attributes: ["id", "size", "quantity", "price"],
            },
          ],
        },
      ],
    });
  } catch {
    throw new ApiError(500, "Failed to fetch products");
  }
};

// ================= CREATE PRODUCT =================

const createProduct = async (data: CreateProductInput) => {
  return Products.create(data);
};

const createProductDetails = async (
  productId: number,
  data: VariantInput[],
) => {
  return sequelize.transaction(async (transaction) => {
    for (const variant of data) {
      const newVariant = await ProductVariant.create(
        {
          colorCode: variant.colorCode,
          colorName: variant.colorName,
          sku: variant.sku,
          isDefault: variant.isDefault ?? false,
          productId,
        },
        { transaction },
      );

      const images = variant.images?.map((img) => ({
        variantId: newVariant.id,
        imageUrl: img.imageUrl,
        sortOrder: img.sortOrder ?? 0,
        isPrimary: img.isPrimary ?? false,
      }));
      if (images && images.length > 0) {
        await ProductImage.bulkCreate(images, { transaction });
      }

      const sizes = variant.sizes.map((size) => ({
        ...size,
        variantId: newVariant.id,
      }));

      await ProductSize.bulkCreate(sizes, { transaction });
    }
  });
};

// ================= GET PRODUCT BY ID =================

const getProductById = async (id: number) => {
  const product = await Products.findByPk(id, {
    attributes: ["id", "name", "price", "discount", "description"],
    include: [
      {
        model: Categories,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: ProductVariant,
        as: "variants",
        attributes: ["id", "colorName", "colorCode", "sku", "isDefault"],
        include: [
          {
            model: ProductSize,
            as: "sizes",
            attributes: ["id", "size", "quantity", "price"],
          },
          {
            model: ProductImage,
            as: "images",
            attributes: ["id", "imageUrl", "isPrimary", "sortOrder"],
          },
        ],
      },
    ],
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// ================= UPDATE PRODUCT =================

const updateProduct = async (
  id: number,
  payload: Partial<CreateProductInput>,
) => {
  const product = await Products.findByPk(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product.update(payload);
};

// ================= DELETE PRODUCT =================

const deleteProduct = async (id: number) => {
  const product = await Products.findByPk(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product.destroy();
};

// ================= GET PRODUCTS BY CATEGORY =================

const getProductsByCategoryId = async (categoryId: number) => {
  const category = await Categories.findByPk(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const products = await Products.findAll({
    where: { categoryId },
    include: [
      {
        model: ProductVariant,
        as: "variants",
        attributes: ["id", "colorName", "colorCode", "sku", "isDefault"],
        include: [
          {
            model: ProductSize,
            as: "sizes",
            attributes: ["id", "size", "quantity", "price"],
          },
          {
            model: ProductImage,
            as: "images",
            attributes: ["id", "imageUrl", "isPrimary", "sortOrder"],
          },
        ],
      },
    ],
  });

  return { category, products };
};

export const productService = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  createProductDetails,
};
