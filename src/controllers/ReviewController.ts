import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import { reviewService } from "../services/ReviewService";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.productId);
    const { rating, comment } = req.body;
    console.log(productId);

    const userId = req.user?.id;
    if (userId) {
      const review = await reviewService.createReview(
        userId,
        productId,
        rating,
        comment,
      );
      return response.ok(res, review, "Review created successfully");
    }

    return response.notFound(res, null, "User not found");
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
