import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dbConnection } from "./database";
import { userRoute } from "./routes/UserRoute";
import "./models";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { categoryRoute } from "./routes/CategoryRoute";
import productRoute from "./routes/ProductRoute";
import productImageRoute from "./routes/ProductImage";
import cartItemRoute from "./routes/CartItemRoute";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

const apiUrl = process.env.API_URL || "/api/v1";
const port = process.env.PORT;

// routes
app.use(apiUrl, categoryRoute);
app.use(apiUrl, productRoute);
app.use(apiUrl, productImageRoute);
app.use(apiUrl, cartItemRoute);
app.use(apiUrl, userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

app.listen(port, () => dbConnection());
