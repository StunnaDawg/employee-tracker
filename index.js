const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const helper = require('./helper');
const app = express();

const helperDB = new helper()

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const employeeQuestions = inquirer.prompt( [
    {
        type: 'list',
        name: 'leadoff',
        message: 'What would you like to do?', //Depending on the answer chosen ask next question
        choices: ['View all Employeees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Quit']

        
    }, 
    {
        type: 'input',
        name: 'departmentName',
        message: 'What name do you want to give your department?',
        when: (answers) => answers.leadoff === 'Add Department'
    
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'What name do you want to give your new role?',
        when: (answers) => answers.leadoff === 'Add Role'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of this new role?',
        when: (answers) => answers.leadoff === 'Add Role'
    }, 
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Which department does this role belong to?',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
        when: (answers) => answers.leadoff === 'Add Role'
    },
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the new employee?',
        when: (answers) => answers.leadoff === 'Add Employee'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the new employee?',
        when: (answers) => answers.leadoff === 'Add Employee'
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'What is the employees role?',
        choices: ['Sales Person', 'Lead Engineer', 'Legal Team Lead', 'Sales Lead', 'Accountant'],
        when: (answers) => answers.leadoff === 'Add Employee'
    },
    {
        type: 'list',
        name: 'roleManager',
        message: 'Who is the employees manager?',
        choices: ['Hannah'],
        when: (answers) => answers.leadoff === 'Add Employee'
    },
    {
        type: 'list',
        name: 'updateEmployeeRole',
        message: 'Which employee role do you want to update?',
        choices: ['Bob'],
        when: (answers) => answers.leadoff === 'Update Employee Role'
    },
    {
    type: 'list',
    name: 'updateRole',
    message: 'Which role do you want to assign the employee?',
    choices: ['Sales Person', 'Lead Engineer', 'Legal Team Lead', 'Sales Lead', 'Accountant'],
    when: (answers) => answers.leadoff === 'Update Employee Role'
    }
]) .then((answers) => {
    if (answers.leadoff === 'View all Departments') {
        helperDB.getAllDepartments();
    }

    if (answers.leadoff === 'Add Department') {
        const departmentName = answers.departmentName;
        helperDB.addDepartment(departmentName);
    };
      
    if (answers.leadoff === 'View all Employeees') {
        helperDB.query('SELECT employees.id, employees.first_name, employees.last_name, roleNames.title_name, roleNames.salary FROM employees JOIN roleNames ON employees.role_id = roleNames.id;', function (err, results) {
         console.table(results)
 })
    
}
if (answers.leadoff === 'View all Roles') {
    helperDB.query('SELECT roleNames.id, roleNames.title_name, roleNames.salary, roleNames.department_id, departmentNames.id AS department_id, departmentNames.department_name FROM roleNames JOIN departmentNames ON roleNames.department_id = departmentNames.id', function (err, results) {
     console.table(results)
}) }
})

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

employeeQuestions;