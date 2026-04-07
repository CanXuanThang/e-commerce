import { Router } from "express";
import { bannerController } from "../controllers/BannerController";
import { validate } from "../middlewares/validate";
import { checkIdSchema } from "../schema/common";
import { bannerSchema } from "../schema/banner";
import { upload } from "../middlewares/uploadImage";
import { checkRole } from "../middlewares/auth";

const bannerRoute = Router();
const path = "/banners";

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner management APIs
 */

/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: Get all banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Banner'
 */

/**
 * @swagger
 * /api/v1/banners/{id}:
 *   post:
 *     summary: Update banner with image upload
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Banner ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               displayOrder:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 */

/**
 * @swagger
 * /api/v1/banners/{id}:
 *   delete:
 *     summary: Delete banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Banner ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 */

bannerRoute.get(path, bannerController.getAllBanner);
bannerRoute.post(
  `${path}/:id`,
  upload.single("image"),
  validate({ params: checkIdSchema, body: bannerSchema }),
  checkRole("admin"),
  bannerController.updateBanner,
);
bannerRoute.delete(
  `${path}/:id`,
  validate({ params: checkIdSchema }),
  checkRole("admin"),
  bannerController.deleteBanner,
);

export default bannerRoute;
