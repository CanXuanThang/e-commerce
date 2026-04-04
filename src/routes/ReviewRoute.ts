import { Router } from "express";
import { reviewController } from "../controllers/ReviewController";
import {
  createReviewSchema,
  getReviewsByProductIdSchema,
} from "../schema/review";
import { validate } from "../middlewares/validate";

const reviewRoute = Router();
const path = "/reviews";

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API quản lý đánh giá sản phẩm
 */

/**
 * @swagger
 * /reviews/product/{productId}:
 *   get:
 *     summary: Lấy danh sách đánh giá theo productId
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Lấy danh sách reviews thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Tạo đánh giá sản phẩm
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Sản phẩm rất tốt
 *             required:
 *               - userId
 *               - productId
 *               - rating
 *     responses:
 *       201:
 *         description: Tạo review thành công
 */

reviewRoute.get(
  `${path}/product/:productId`,
  validate({ params: getReviewsByProductIdSchema }),
  reviewController.getReviewsByProductId,
);
reviewRoute.post(
  path,
  validate({ body: createReviewSchema }),
  reviewController.createReview,
);

export default reviewRoute;
