import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dbConnection } from "./database";
import { userRoute } from "./routes/UserRoute";
import "./models";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

const apiUrl = process.env.API_URL || "/api/v1";
const port = process.env.PORT;

app.use(apiUrl, userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  dbConnection();
  console.log(`Server is running on port ${port}`);
});
