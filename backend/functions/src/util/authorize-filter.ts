import { admin } from "./firestore";
import { Request, Response } from "express";


export const authorize = async (req: Request, res: Response, next:any) => {
  try {
    let idToken:string|undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      console.error("No token found");
      return res.status(403).json({ error: "Unauthorized" });
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      return next();
    }
    return res.status(403).json({ error: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ error: "Internal error" });
  }
};
