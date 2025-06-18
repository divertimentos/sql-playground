import express, { Request, Response } from "express";

export const router = express.Router();

// Index
router.get("/", (_req: Request, res: Response) => {
  res.send("Hello, World!");
});
