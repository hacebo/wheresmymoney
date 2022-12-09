import { Express, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { auth } from "../util/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useUsersApi = (app: Express) => {
  app.post("/login",
      body("email").exists(),
      body("password").exists(),
      loginUserAsync);
};


const loginUserAsync = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const signInResult = await signInWithEmailAndPassword(auth, email, password);
    const token = await signInResult.user.getIdToken();

    return res.status(200).json({ auth_token: token });
  } catch (error: any) {
    return res.status(403).json({ status: "error", message: "Invalid Credentials" });
  }
};
