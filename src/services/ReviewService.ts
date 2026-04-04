import { Reviews } from "../models/Reviews";

const createReview = async (
  userId: number,
  productId: number,
  rating: number,
  comment?: string,
) => {
  return Reviews.create({ userId, productId, rating, comment });
};

const getReviewsByProductId = async (productId: number) => {
  return Reviews.findAll({ where: { productId } });
};

export const reviewService = {
  createReview,
  getReviewsByProductId,
};
