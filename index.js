const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const departmentData = mysql.createConnection(
    {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'department_db'
  }
  );

  departmentData.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL successfully!');
});

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
       departmentData.query('SELECT * FROM departmentNames', function (err, results) {
        console.table(results)
});

    }
})

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

employeeQuestions;