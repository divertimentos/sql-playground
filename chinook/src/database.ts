import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("chinook.db", (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err.message);
  } else {
    console.log(" Connected to the SQLite database.");
  }
});
