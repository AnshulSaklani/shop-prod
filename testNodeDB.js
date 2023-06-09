let mysql = require("mysql");
let connData = {
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb",
};

let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

function showPersons() {
	let connection = mysql.createConnection(connData);
	let sql = "SELECT * FROM persons";
	connection.query(sql, function(err, result) {
		if (err) console.log(err);
		else console.log(result);
	});
}

function showPersonsByName(name) {
	let connection = mysql.createConnection(connData);
	let sql = "SELECT * FROM persons WHERE name=?";
	connection.query(sql, name, function(err, result) {
		if (err) console.log(err);
		else console.log(result);
	});
}

function insertPerson(params) {
	let connection = mysql.createConnection(connData);
	let sql = "INSERT INTO persons(name,age) VALUES(?,?)"
	connection.query(sql, params, function(err, result) {
		if(err) console.log(err);
		else {
		console.log("Id of inserted record : ", result.insertId);
		connection.query(sql, name, function(err, result) {
		if (err) console.log(err);
		else console.log(result);
	});
	}
});
}

function insertPersons(params) {
	let connection = mysql.createConnection(connData);
	let sql = "INSERT INTO persons(name, age) VALUES ?";
	connection.query(sql, [params], function (err, result) {
		if (err) console.log(err);
		else console.log(result);
	});
}

function incrementAge(id) {
	let connection = mysql.createConnection(connData);
	let sql = "UPDATE persons SET age=age+1 WHERE id=?";
	connection.query(sql,id,function(err, result) {
		if (err) console.log(err);
		else console.log(result);
	});
}

function changeAge(id, newAge) {
	let connection = mysql.createConnection(connData);
	let sql = "UPDATE persons SET age=age+1 WHERE id=?";
	connection.query(sql, [newAge, id], function(err, result) {
		if (err) console.log(err);
		else console.log(result);
	});
}

function resetData() {
	let connection = mysql.createConnection(connData);
	let sql1 = "DELETE FROM persons";
	connection.query(sql1, function(err, result) {
		if (err) console.log(err);
		else console.log("Successfully deleted. Affected rows :", result.affectedRows);
		let {persons} = require("./testData.js");
		let arr = persons.map(p => [p.name, p.age]);
		let sql2 = "INSERT INTO persons(name, age) VALUES ?";
		connection.query(sql2, [arr], function(err, result){
			if (err) console.log(err);
			else console.log("Successfully inserted. Affected rows :", result.affectedRows);
		});
	})
}

//resetData();
//changeAge(3, 33);
//incrementAge(3);
showPersons();
//showPersonsByName("Bob");
//insertPerson(["George", 33]);
/*insertPersons([
	["Jim", 30],
	["Amy", 34],
	["Steven", 24],
]);*/