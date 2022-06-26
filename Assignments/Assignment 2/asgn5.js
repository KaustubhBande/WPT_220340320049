const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static("sf"));

app.listen(550);

app.get('/getbalance', (req, resp) => {
    console.log("ajax function called");
    const dbobject = {
        host: 'localhost',
        user: 'kaustubh',
        password: 'cdac',
        database: 'study',
        port: 3306
    }
    const conn = mysql.createConnection(dbobject);

    let output = { status: false, detail: { acno: 0, balance: "" } }
    let acno = req.query.acno;
    console.log(acno);
    conn.query('select acno, balance from account where acno = ?', [acno],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.detail = rows[0];
                }
                else {
                    console.log("No account with this Account No.");
                }
            }
            console.log(output);
            resp.send(output);
        });

});