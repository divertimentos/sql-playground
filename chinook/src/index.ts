import express from "express";
import { router as homeRouter } from "./routes/home";
import { router as artistsRouter } from "./routes/artists";
const app = express();

app.use(express.json());
app.use("/artists", artistsRouter);
app.use("/", homeRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
