import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dbConnection } from "./database";
import "./models";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { categoryRoute } from "./routes/CategoryRoute";
import productRoute from "./routes/ProductRoute";
import productImageRoute from "./routes/ProductImage";
import cartItemRoute from "./routes/CartItemRoute";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import cors from "cors";
import bannerRoute from "./routes/BannerRoute";
import "./types/express";
import reviewRoute from "./routes/ReviewRoute";
import { orderRoute } from "./routes/OrderRoute";
import userRoute from "./routes/UserRoute";
import http from "http";
import { initSocket } from "./config/socket";

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

const apiUrl = process.env.API_URL || "/api/v1";
const port = process.env.PORT || 3000;

// routes
app.use(apiUrl, categoryRoute);
app.use(apiUrl, productRoute);
app.use(apiUrl, productImageRoute);
app.use(apiUrl, cartItemRoute);
app.use(apiUrl, bannerRoute);
app.use(apiUrl, reviewRoute);
app.use(apiUrl, userRoute);
app.use(apiUrl, orderRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

const server = http.createServer(app);

initSocket(server);

const startServer = async () => {
  await dbConnection();

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
