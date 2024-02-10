import express, { Request, Response } from 'express';
import cors from "cors";
import mysql from "mysql2/promise";
const app = express();
import('body-parser');
const fileUpload = require('express-fileupload');
app.use(fileUpload());



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


app.post('/addQuestion', async (req: Request, res: Response) => {
  const { question, options, answer, image } = req.body;
  console.log(question, options, answer, image);
  try {
    const query = `INSERT INTO questionbank (question, options, answer, image) VALUES ('${question}',  '${JSON.stringify(options)}', '${answer}', '${image || null}');`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.get('/getQuestions', async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM questionbank;`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.get('/getQuestion/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM questionbank WHERE id=${id};`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.post('/deleteQuestion', async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const query = `DELETE FROM questionbank WHERE id=${id};`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.post('/createTest', async (req: Request, res: Response) => {
  const { name, questions, duration } = req.body;
  try {
    const query = `INSERT INTO test (name, questions, duration) VALUES ('${name}', '${JSON.stringify(questions)}', '${duration}');`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.get('/getTests', async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM test;`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.get('/getTest/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const query = `SELECT * FROM test WHERE id=${id};`;
    const result1:any = await (await connection).query(query);
    res.json(result1[0]);
  }
  catch (error:any) {
    res.send("errpr")
  }
});

app.post('/submitTest', async (req: Request, res: Response) => {
  const { student_id, test_id, score } = req.body;
  try {
    const query = `INSERT INTO testresult (student_id, test_id, score) VALUES ('${student_id}', '${test_id}', '${score}');`;
    const result1:any = await (await connection).query(query);
    console.log(result1[0]);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

app.get('/getTestResults', async (req: Request, res: Response) => {
  
  try {
    const query = `SELECT student.id, student.name as student_name, student.email, testresult.score, testresult.test_id, test.name as test_name
    FROM student
    JOIN testresult ON student.id = testresult.student_id
    JOIN test ON testresult.test_id = test.id;`;
    const result1:any = await (await connection).query(query);
    console.log(result1[0]);
    res.json(result1[0]);
  } catch (error:any) {
    res.status(300).json(error.message)
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
