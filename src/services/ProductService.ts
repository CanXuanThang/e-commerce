import { Categories } from "../models/Categories";
import { ProductImage } from "../models/ProductImage";
import { Products } from "../models/Products";
import { ApiError } from "../utils/apiError";
import sequelize from "../database/database";
import { ProductVariant } from "../models/ProductVariant";
import { ProductSize } from "../models/ProductSize";

import { ProductSizeCreationAttributes } from "../models/ProductSize";

import { ProductImageCreationAttributes } from "../models/ProductImage";

export interface SizeInput {
  size: string;
  quantity: number;
}

export interface ImageInput {
  imageUrl: string;
  isPrimary?: boolean;
}

export interface VariantInput {
  colorName: string;
  colorCode: string;
  sku: string;
  sizes: SizeInput[];
  images?: ImageInput[];
}

export interface CreateProductInput {
  name: string;
  description?: string;
  categoryId: number;
  price: number;
  discount: number;
  variants: VariantInput[];
}

// ================= GET ALL PRODUCTS =================

const getAllProducts = async () => {
  try {
    return Products.findAll({
      attributes: ["id", "name", "price", "discount"],
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
  const transaction = await sequelize.transaction();

  try {
    // create product
    const product = await Products.create(
      {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        price: data.price,
        discount: data.discount,
      },
      { transaction },
    );

    // create variants
    const createdVariants = await ProductVariant.bulkCreate(
      data.variants.map((variant: VariantInput) => ({
        productId: product.id,
        colorName: variant.colorName,
        colorCode: variant.colorCode,
        sku: variant.sku,
      })),
      {
        transaction,
        returning: true,
      },
    );

    const sizesPayload: ProductSizeCreationAttributes[] = [];
    const imagesPayload: ProductImageCreationAttributes[] = [];

    createdVariants.forEach((variant, index) => {
      const variantData = data.variants[index];

      // sizes
      variantData.sizes.forEach((size: SizeInput) => {
        sizesPayload.push({
          variantId: variant.id,
          size: size.size,
          quantity: size.quantity,
        });
      });

      // images
      variantData.images?.forEach((image: ImageInput, imageIndex: number) => {
        imagesPayload.push({
          variantId: variant.id,
          imageUrl: image.imageUrl,
          sortOrder: imageIndex,
          isPrimary: image.isPrimary ?? false,
        });
      });
    });

    if (sizesPayload.length) {
      await ProductSize.bulkCreate(sizesPayload, { transaction });
    }

    if (imagesPayload.length) {
      await ProductImage.bulkCreate(imagesPayload, { transaction });
    }

    await transaction.commit();

    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
            attributes: ["id", "size", "quantity"],
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
        include: [
          {
            model: ProductImage,
            as: "images",
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
};
