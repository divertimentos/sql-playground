import express, { Request, Response } from "express";

import { db } from "../database";

export const router = express.Router();

router.get("/album", (_req: Request, res: Response) => {
  const query = "SELECT * FROM albums;";

  db.all(query, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query error", error: err });
    }
    res.status(200).json(rows);
  });
});
