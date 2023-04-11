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

  getAllDepartmentsNames() {
    const sql = 'SELECT department_name FROM departmentNames';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      return (results);
    });
  }

  getAllDepartments() {
    const sql = 'SELECT * FROM departmentNames';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }

  getAllRoles() {
    const sql = 'SELECT roleNames.id, roleNames.title_name, roleNames.salary, roleNames.department_id, departmentNames.id AS department_id, departmentNames.department_name FROM roleNames JOIN departmentNames ON roleNames.department_id = departmentNames.id';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }

  getAllRoleNames() {
    const sql = 'SELECT title_name FROM roleNames';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      return (results);
    });
  }

  addRole(roleName, salary, departmentName) {
    const getDepartmentIdSql = 'SELECT id FROM departmentNames WHERE department_name = ?';
    this.connection.query(getDepartmentIdSql, [departmentName], (err, departmentResults) => {
      if (err) throw err;

   // Extract department ID from query results
   const departmentId = departmentResults[0].id;

   // Insert role with department ID into roleNames table
   const insertRoleSql = 'INSERT INTO roleNames (title_name, salary, department_id) VALUES (?, ?, ?)';
   this.connection.query(insertRoleSql, [roleName, salary, departmentId], (err, roleResults) => {
     if (err) throw err;
     console.log('Role added successfully!');
    });
});
}

getAllEmployeeNames() {
    const sql = 'SELECT first_name, last_name FROM employees';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      return (results);
    });
  }

  getAllEmployees() {
    const sql = 'SELECT employees.id, employees.first_name, employees.last_name, roleNames.title_name, roleNames.salary FROM employees JOIN roleNames ON employees.role_id = roleNames.id;';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }
}

module.exports = DBHandler;