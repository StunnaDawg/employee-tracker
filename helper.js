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
    return new Promise((resolve, reject) => {
        const sql = 'SELECT title_name FROM roleNames';
        this.connection.query(sql, function (err, results) {
          if (err) reject(err);
          resolve(results);
        });
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
    return new Promise((resolve, reject) => {
    const sql = 'SELECT first_name, last_name FROM employees';
    this.connection.query(sql, function (err, results) {
        if (err) reject(err);
        resolve(results);
    });
  })
}

  getAllEmployees() {
    const sql = 'SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roleNames.title_name, roleNames.salary FROM employees JOIN roleNames ON employees.role_id = roleNames.id;';
    this.connection.query(sql, function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }

  getAllManager() {
    return new Promise((resolve, reject) => {
    const sql = 'SELECT first_name FROM employees WHERE manager_id IS NULL;';
    this.connection.query(sql, function (err, results) {
      if (err) reject(err);
          resolve(results);
        });
    });
}


  addEmployee(firstName, lastName, title) {
    const getRoleIdSql = 'SELECT id FROM roleNames WHERE title_name = ?';
    this.connection.query(getRoleIdSql, [title], (err, roleResults) => {
      if (err) throw err;

   // Extract department ID from query results
   const roleId = roleResults[0].id;

   
   const insertRoleSql = 'INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)';
   this.connection.query(insertRoleSql, [firstName, lastName, roleId], (err, roleResults) => {
     if (err) throw err;
     console.log('Role added successfully!');
    });

  })}

  updateEmployeeRole(employeeName, roleName) {
    return new Promise((resolve, reject) => {
      // Retrieve employeeId based on employeeName
      const getEmployeeIdSql = 'SELECT id FROM employees WHERE first_name = ?';
      this.connection.query(getEmployeeIdSql, [employeeName], (err, employeeResults) => {
        if (err) reject(err);
        const employeeId = employeeResults[0].id;
  
        // Retrieve newRoleId based on roleName
        const getRoleIdSql = 'SELECT id FROM roleNames WHERE title_name = ?';
        this.connection.query(getRoleIdSql, [roleName], (err, roleResults) => {
          if (err) reject(err);
          const newRoleId = roleResults[0].id;
  
          // Update the employee's current role to NULL or a different value
          const updateCurrentRoleSql = 'UPDATE employees SET role_id = NULL /* or new role ID */ WHERE id = ?';
          this.connection.query(updateCurrentRoleSql, [employeeId], (err, result) => {
            if (err) reject(err);
            console.log('Employee current role updated successfully');
  
            // Update the new role for the employee
            const updateNewRoleSql = 'UPDATE employees SET role_id = ? WHERE id = ?';
            this.connection.query(updateNewRoleSql, [newRoleId, employeeId], (err, result) => {
              if (err) reject(err);
              console.log('New role updated for employee successfully');
              resolve(result);
            });
          });
        });
      });
    })
    .catch(err => {
      console.error('Error updating employee role:', err);
      throw err; // or handle the error in an appropriate way for your application
    });
  }
}

module.exports = DBHandler;