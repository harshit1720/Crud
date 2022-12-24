import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"sql0045",
    database: "test"
});

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.json("hello this is backend");
});

app.get("/books", (req,res) => {
    const q = "SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const value = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q,[value],(err,data) =>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});


app.listen(5000, () => {
    console.log("Conneted to Backend!");
});