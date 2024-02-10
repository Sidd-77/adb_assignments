import express, { Request, Response } from 'express';
import cors from "cors";
import mysql from "mysql2/promise";
const app = express();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "as4",
});


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is running...');
});


app.post('/teacher/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const query = `SELECT * FROM teacher WHERE email='${email}' AND password='${password}';`;
    const result1:any = await (await connection).query(query);
    console.log(result1[0][0]);
    res.json(result1[0][0]);
  } catch (error:any) {
    console.log(error.message);
    res.status(300).json(error.message)
  }
});

app.post('/student/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const query = `SELECT * FROM student WHERE email='${email}' AND password='${password}';`;
    const result1:any = await (await connection).query(query);
    console.log(result1[0][0]);
    res.json(result1[0][0]);
  } catch (error:any) {
    console.log(error.message);
    res.status(300).json(error.message)
  }
});

app.post('/teacher/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const query = `INSERT INTO teacher (name, email, password) VALUES ('${name}', '${email}', '${password}');`;
    const result1:any = await (await connection).query(query);
    console.log(result1[0]);
    res.json(result1[0]);
  } catch (error:any) {
    console.log(error.message);
    res.status(300).json(error.message)
  }
});

app.post('/student/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const query = `INSERT INTO student (name, email, password) VALUES ('${name}', '${email}', '${password}');`;
    const result1:any = await (await connection).query(query);
    console.log(result1[0]);
    res.json(result1[0]);
  } catch (error:any) {
    console.log(error.message);
    res.status(300).json(error.message)
  }
});



const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
