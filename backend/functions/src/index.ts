import * as functions from "firebase-functions";
import app from "./util/app";

export const api = functions.https.onRequest(app);
