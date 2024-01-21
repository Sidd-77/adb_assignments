import express, { Request, Response } from 'express';
import cors from 'cors';
import { Connection } from 'postgresql-client';

const app = express();

// database connections

const connection = new Connection({
    host: '127.0.0.1',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'postgres',
});


connection.connect().then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(cors());


app.get('/', async (req: Request, res: Response) => {
    const result1 = await connection.query('SELECT * FROM users');
    console.log(result1.rows)
    res.json(result1.rows);
});

app.post('/', async (req: Request, res: Response) => {
    const { name, prn } = req.body;
    console.log(name, prn);
    const query = `INSERT INTO users (name, prn) VALUES ('${name}', '${prn}');`;
    const result1 = await connection.query(query);
    res.json(result1.rows);
});

app.post('/update', async (req: Request, res: Response) => {
    const { name, prn } = req.body;
    console.log(name, prn);
    const query = `UPDATE users SET name='${name}' WHERE prn='${prn}';`;
    const result1 = await connection.query(query);
    res.json(result1.rows);
});

app.post('/delete', async (req: Request, res: Response) => {
    const { prn } = req.body;
    console.log(prn);
    const query = `DELETE FROM users WHERE prn='${prn}';`;
    const result1 = await connection.query(query);
    res.json(result1.rows);
});

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`);
});
