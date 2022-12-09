import express, { Express } from "express";
import * as dotenv from "dotenv";
import { useAccountTypesApi } from "../apis/account-types";
import { useUsersApi } from "../apis/users";

dotenv.config();

const app: Express = express();

useUsersApi(app);
useAccountTypesApi(app);

export default app;
