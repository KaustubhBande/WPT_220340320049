
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');


const mysql = require('mysql2');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

//
let dbparameters = {
	host: 'localhost',
	user: 'kaustubh',
	password: 'cdac',
	database: 'study',
	port: 3306
}

const connection = mysql.createConnection(dbparameters);

//function getbook
app.get("/getbook", (req, resp) => {
	console.log("inside getbook function");

	let bookid = req.query.bookid;

	let output = {status: false, bookdetails: {bookid: 0, bookname: "", price: 0}}
	
	connection.query('select bookid, bookname, price from book where bookid = ?', [bookid], 
			(error, rows) => {
				if(error){
					console.log(error);
				}
				else{
					if(rows.length > 0){
						console.log("Book Found");
						console.log(rows[0]);
						output.status = true;
						output.bookdetails = rows[0];
					}
					else{
						console.log("Book not Found");
					}
				}
				console.log(output);
				resp.send(output);
			});
			
});

//function updatebookprice
app.get("/updatebookprice", (req, resp) => {
	console.log("inside updatebookprice function");

	let bookid = req.query.bookid;
	let price = req.query.price;

	let output = {status: false}
	
	connection.query('update book set price = ? where bookid = ?', [price, bookid], 
			(error, res) => {
				if(error){
					console.log(error);
				}
				else{
					if(res.affectedRows > 0){
						console.log("Book price updated");
						output.status = true;
					}
					else{
						console.log("Book price not updated");
					}
				}
				console.log(output);
				resp.send(output);
			});
			
});


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});