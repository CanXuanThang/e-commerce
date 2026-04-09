import { Products } from "../models/Products";
import { Reviews } from "../models/Reviews";
import { Users } from "../models/Users";
import { ApiError } from "../utils/apiError";

const createReview = async (
  userId: number,
  productId: number,
  rating: number,
  comment?: string,
) => {
  const product = await Products.findByPk(productId);
  if (!product) {
    throw new ApiError(404, "Product not found !");
  }

  return Reviews.create({ userId, productId, rating, comment });
};

const getReviewsByProductId = async (productId: number) => {
  return Reviews.findAll({
    where: { productId },
    attributes: ["id", "rating", "comment"],
    include: [
      { model: Users, as: "user", attributes: ["id", "name", "email"] },
    ],
  });
};

export const reviewService = {
  createReview,
  getReviewsByProductId,
};
