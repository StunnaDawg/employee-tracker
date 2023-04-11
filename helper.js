const mysql = require('mysql2');

class DBHandler {
  constructor() {
    this.connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'department_db'
    });

    this.connection.connect(function (err) {
      if (err) throw err;
      console.log('Connected to MySQL database!');
    });
  }

  addDepartment(departmentName) {
    const sql = 'INSERT INTO departmentNames (department_name) VALUES (?)';
    this.connection.query(sql, [departmentName], function (err, results) {
      if (err) throw err;
      console.log('Department added successfully!');
    });
  }

  getAllDepartments() {
    const sql = 'SELECT * FROM departmentNames';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }
}

module.exports = DBHandler;