
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "react_quick_note"
});

app.post("/insert", (req, res) => {

    const title = req.body.title;
    const text = req.body.text;
    const tag = req.body.tag;
    const author = req.body.author;
    const datetime = req.body.datetime;

    db.query (
        "INSERT INTO note (title, text, tag, author, datetime) VALUES (?, ?, ?, ?, ?)", [title, text, tag, author, datetime], 
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    );

})

app.get("/getNotes", (req, res) => {
    db.query("SELECT * FROM note", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result)
        }
    });
});

app.put("/update", (req, res) => {

    let id = req.body.id;
    let title = req.body.title;
    let tag = req.body.title;
    let text = req.body.text;
    let datetime = req.body.datetime;

    db.query(
        "UPDATE note SET title = ?, tag = ?, text = ?, datetime = ? WHERE id = ?",
        [title, tag, text, datetime, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    let id = req.params.id;
    db.query("DELETE FROM note WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

app.listen(3001, () => {
    console.log("Node express server running on port 3001");
})