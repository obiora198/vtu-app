// vtu-app/server/index.js

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./resolvers/index.js";
import { verifyToken } from "./utils/auth.js";
import cors from "cors";
import bodyParser from "body-parser";
import webhookRouter from './webhooks/paystack.js';

dotenv.config();

const startServer = async () => {
  const app = express();

  app.use('/webhook/paystack', webhookRouter);
  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = verifyToken(token);
        return { user };
      },
    })
  );

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

startServer();
