import { Connection } from 'postgresql-client';

const connection = new Connection({
    host: '127.0.0.1',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'postgres',
});

connection.connect().then(()=>{
    console.log("connected");
    // createTable();
    insertData();
})
.catch((err)=>{
    console.log(err);
})

const insertData = async () => {
    const query = [
        `INSERT INTO users (name, prn) VALUES ('Doshi', '21510120')`,
        `INSERT INTO users (name, prn) VALUES ('Vivek', '21510113')`,
        `INSERT INTO users (name, prn) VALUES ('Test-Student', '21510001')`,
    ];
    try {
        const result1 = await connection.query(query[0]);
        const result2 = await connection.query(query[1]);
        const result3 = await connection.query(query[2]);
        console.log("Insert success", result1, result2, result3 );
    } catch (err) {
        console.log("Insert error", err);
    }
}

const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            prn SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );
    `;
    try {
        const result = await connection.query(query);
        console.log("success", result);
    } catch (err) {
        console.log("error",err);
    }
}

