import express, { Express } from "express";
import * as dotenv from "dotenv";
import { useAccountTypesApi } from "../apis/account-types";

dotenv.config();

const app: Express = express();

useAccountTypesApi(app);

export default app;
