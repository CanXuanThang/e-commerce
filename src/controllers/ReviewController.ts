import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import { reviewService } from "../services/ReviewService";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, productId, rating, comment } = req.body;
    const review = await reviewService.createReview(
      userId,
      productId,
      rating,
      comment,
    );
    return response.ok(res, review, "Review created successfully");
  } catch (error) {
    next(error);
  }
};

const getReviewsByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = parseInt(req.params.productId as string);
    const reviews = await reviewService.getReviewsByProductId(productId);
    return response.ok(res, reviews, "Get reviews by product ID successfully");
  } catch (error) {
    next(error);
  }
};

export const reviewController = {
  createReview,
  getReviewsByProductId,
};
