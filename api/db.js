const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,        
  user: 'root',       
  password: 'root',   
  database: 'guitar_pedals_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database using MAMP');
  }
});

module.exports = connection;
