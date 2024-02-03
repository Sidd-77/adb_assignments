import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
const app = express();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "as3",
});

app.use(express.json());
app.use(cors());

app.get("/students", async (req: Request, res: Response) => {
  const result1 = await (await connection).query("SELECT * FROM students");
  res.json(result1[0]);
});

app.get("/teachers", async (req: Request, res: Response) => {
  const result1 = await (await connection).query("SELECT * FROM teachers");
  res.json(result1[0]);
});

app.post("/addStudent", async (req: Request, res: Response) => {
  const { name, email, grades } = req.body;
  
  const query = `INSERT INTO students (student_name, email, grade) VALUES ('${name}', '${email}', '${grades}');`;
  const result1 = await (await connection).query(query);
  res.json(result1);
});

app.post("/addTeacher", async (req: Request, res: Response) => {
  const { name, email, subject } = req.body;
  const query = `INSERT INTO teachers (teacher_name, email, subject) VALUES ('${name}', '${email}', '${subject}');`;
  const result1 = await (await connection).query(query);
  res.json(result1);
});

app.post("/deleteTeacher", async (req: Request, res: Response) => {
  const { teacher_id } = req.body;
  const query = `DELETE FROM teachers WHERE teacher_id='${teacher_id}';`;
  const result1 = await (await connection).query(query);
  res.json(result1);
});

app.post("/updateTeacher", async (req: Request, res: Response) => {
  const { name, email, subject, teacher_id } = req.body;
  const query = `UPDATE teachers SET teacher_name='${name}', email='${email}', subject='${subject}' WHERE teacher_id='${teacher_id}';`;
  const result1 = await (await connection).query(query);
  res.json(result1);
});

app.post("/updateStudent", async (req: Request, res: Response) => {
  const { name, email, grades, student_id } = req.body;
  const query = `UPDATE students SET student_name='${name}', email='${email}', grade='${grades}' WHERE student_id='${student_id}';`;
  const result1 = await (await connection).query(query);
  res.json(result1);
});

app.post("/deleteStudent", async (req: Request, res: Response) => {
  const { student_id } = req.body;
  const query = `DELETE FROM students WHERE student_id='${student_id}';`;
  const result1 = await (await connection).query(query);
  res.json(result1);
});

app.post("/loginTeacher", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  const query = `SELECT * FROM teachers WHERE email='${email}' AND teacher_id='${password}';`;
  const result1:any = await (await connection).query(query);
  if (result1[0].length > 0) {
    console.log(result1[0][0]);
    res.json(result1[0][0]);
  } else {
      res.json("fail");
  }
});

app.post("/loginStudent", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    const query = `SELECT * FROM students WHERE email='${email}' AND student_id='${password}';`;
    const result1:any = await (await connection).query(query);
    if (result1[0].length > 0) {
      console.log(result1[0][0]);
      res.json(result1[0][0]);
    } else {
        res.json("fail");
    }
  });

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`);
});
