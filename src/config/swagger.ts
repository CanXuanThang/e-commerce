import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API test bằng Swagger",
    },
    servers: [
      {
        url: "https://e-commerce-production-eaaf.up.railway.app//api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // 👈 đọc swagger từ routes
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
