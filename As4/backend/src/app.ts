import express from 'express';
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is running...');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
