import express, { Request, Response } from "express";

import { db } from "../database";

export const router = express.Router();

// Get last 5 artists
router.get("/last", (_req: Request, res: Response) => {
  const query = "SELECT * FROM artists ORDER BY artistId DESC LIMIT 5";
  db.all(query, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query error", error: err });
    }
    res.status(200).json(rows);
  });
});

// Create an artist
router.post("/new", (req: Request, res: Response) => {
  const query = "INSERT INTO artists (Name) VALUES (?)";
  const { name } = req.body;
  db.run(query, [name], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ name });
  });
});

// Read/retrieve all artsts
router.get("/", (_req: Request, res: Response) => {
  const query = "SELECT * FROM artists";
  db.all(query, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query error", error: err });
    }
    res.status(200).json(rows);
  });
});

// Update artist name
router.put("/edit/:id", (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;
  const query = "UPDATE artists SET name = ? WHERE artistId = ?";

  db.run(query, [name, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updateId: id, name });
  });
});

// Delete an artist
router.delete("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const query = "DELETE FROM artists WHERE artistId = ?";
  db.run(query, id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ delete: id });
  });
});

// list favorite artists
router.get("/favorites", (_req: Request, res: Response) => {
  const query = "SELECT * FROM artists WHERE isFavorite = 1";

  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});
