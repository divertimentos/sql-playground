import express, { Request, Response } from 'express'

import sqlite3 from 'sqlite3'

const app = express()
const port = 3000


const db = new sqlite3.Database('chinook.db', (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message)
  } else {
    console.log(' Connected to the SQLite database.')
  }
})

app.use(express.json())

// Index

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!')
})

// Define a simple route that fetches data from the database
app.get('/album', (_req: Request, res: Response) => {
  const query = 'SELECT * FROM albums;';

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error', error: err });
    }
    res.status(200).json(rows);
  });
});

// Add an artist
app.post('/artist', (req: Request, res: Response) => {
  const query = 'INSERT INTO artists (Name) VALUES (?)'
  const { name } = req.body
  db.run(query, [name], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ name })
  })

})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
