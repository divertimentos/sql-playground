import express from 'express';
const app = express();
const artistRoutes = require('./routes/artists.ts');
const homeRoutes = require('./routes/home.ts')

app.use(express.json());
app.use('/artists', artistRoutes);
app.use('/', homeRoutes)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

