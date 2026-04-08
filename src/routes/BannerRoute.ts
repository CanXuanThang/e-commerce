import { Router } from "express";
import { bannerController } from "../controllers/BannerController";
import { validate } from "../middlewares/validate";
import { checkIdSchema } from "../schema/common";
import { bannerSchema } from "../schema/banner";
import { upload } from "../middlewares/uploadImage";
import { checkRole, verifyToken } from "../middlewares/auth";

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
 * /banners:
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
 * /banners/{id}:
 *   put:
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
 *               order:
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
 * /banners/{id}:
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

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Upload multiple images with order
 *     tags: [Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               orders:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1,2,3]
 *     responses:
 *       200:
 *         description: Upload success
 */

bannerRoute.get(path, bannerController.getAllBanner);

bannerRoute.put(
  `${path}/:id`,
  upload.single("image"),
  verifyToken,
  validate({ params: checkIdSchema, body: bannerSchema }),
  checkRole("admin"),
  bannerController.updateBanner,
);

bannerRoute.delete(
  `${path}/:id`,
  validate({ params: checkIdSchema }),
  verifyToken,
  checkRole("admin"),
  bannerController.deleteBanner,
);

bannerRoute.post(
  path,
  upload.array("images", 5),
  verifyToken,
  checkRole("admin"),
  bannerController.create,
);

export default bannerRoute;
