import { Express, Request, Response } from "express";
import { db } from "../util/firestore";
import { body, param, validationResult } from "express-validator";

export const useAccountTypesApi = (app: Express) => {
  app.get("/account-types",
      getAccountTypesAsync);

  app.post("/account-types",
      body("name").exists(),
      postAccountTypeAsync);

  app.put("/account-types/:id",
      param("id").exists(),
      body("name").exists(),
      putAccountTypeAsync);

  app.delete("/account-types/:id",
      param("id").exists(),
      deleteAccountTypeAsync);
};


const getAccountTypesAsync = async (req: Request, res: Response) => {
  try {
    const accountTypesRef = db.collection("account-types");
    const snapshot = await accountTypesRef.get();
    const types: any[] = [];
    snapshot.forEach((doc: any) => {
      types.push({ id: doc.id, ...doc.data() });
    });
    return res.json(types);
  } catch (error: any) {
    return res.status(500).json({ error: error.code });
  }
};

const postAccountTypeAsync = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    const accountTypesRef = db.collection("account-types");
    const newAccountType = { name, createdAt: new Date().toISOString() };
    const doc = await accountTypesRef.add(newAccountType);
    const created = { ...newAccountType, id: doc.id };
    return res.json(created);
  } catch (error: any) {
    return res.status(500).json({ error: error.code });
  }
};

const putAccountTypeAsync = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    const accountTypeRef = db.collection("account-types").doc(`${id}`);
    await accountTypeRef.update(req.body);

    return res.json(req.body);
  } catch (error: any) {
    return res.status(500).json({ error: error.code });
  }
};


const deleteAccountTypeAsync = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const doc = db.collection("account-types").doc(`${id}`);
    await doc.delete({ exists: true });
    return res.json();
  } catch (error: any) {
    if (error.message.includes("NOT_FOUND")) {
      return res.status(404).json({ error: "Element not foud." });
    }
    return res.status(500).json({ error: error.code });
  }
};
