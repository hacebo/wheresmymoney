import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY || "mock-key",
  authDomain: process.env.AUTH_DOMAIN || "",
  projectId: process.env.PROJECT_ID || "",
  storageBucket: process.env.STORAGE_BUCKET || "",
  messageSenderId: process.env.MESSAGE_SENDER_ID || "",
  appId: process.env.APP_ID || "",
};

const app:FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
