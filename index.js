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

function startPrompt () {
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
        choices: async (answers) => {
            if (answers.leadoff === 'Add Role') {
              // Fetch department names asynchronously
              const departmentNames = await helperDB.getAllDepartmentsNames();
              return departmentNames;
            } else {
              return [];
            }
          },
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
        name: 'newEmployeeRole',
        message: 'What is the employees role?',
        choices: async () => {
            try {
              const roleNames = await helperDB.getAllRoleNames();
              return roleNames.map(role => role.title_name);
            } catch (err) {
              console.error(err);
              return []; // Return empty array as choices in case of error
            }
          },
        when: (answers) => answers.leadoff === 'Add Employee'
    },
    {
        type: 'list',
        name: 'roleManager',
        message: 'Who is the employees manager?',
        choices: async () => {
            try {
              const managers = await helperDB.getAllManager();
              return managers.map(manager => manager.first_name);
            } catch (err) {
              console.error(err);
              return []; // or handle the error in an appropriate way
            }
          },
        when: (answers) => answers.leadoff === 'Add Employee'
    },
    {
        type: 'list',
        name: 'updateEmployeeRole',
        message: 'Which employee role do you want to update?',
        choices: async () => {
            try {
              const employeeNames = await helperDB.getAllEmployeeNames();
              return employeeNames.map(employee => employee.first_name); 
            } catch (err) {
              console.error(err);
              return [];
            }
          },
          when: (answers) => answers.leadoff === 'Update Employee Role'
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'Which role do you want to assign the employee?',
            choices: async () => {
              try {
                const roleNames = await helperDB.getAllRoleNames();
                return roleNames.map(roleNames => roleNames.title_name)
              } catch (err) {
                console.error(err);
                return [];
              }
            },
            when: (answers) => answers.leadoff === 'Update Employee Role'
          }
]) .then((answers) => {
    if (answers.leadoff === 'View all Departments') {
        helperDB.getAllDepartments();
        
    }

    if (answers.leadoff === 'Add Department') {
        const departmentName = answers.departmentName;
        helperDB.addDepartment(departmentName);
        startPrompt();
    };
      
    if (answers.leadoff === 'View all Employeees') {
        helperDB.getAllEmployees();
 }
    if (answers.leadoff === 'View all Roles') {
    helperDB.getAllRoles();
    
}   
    if (answers.leadoff === 'Add Role') {
        const roleName = answers.roleName;
        const roleSalary = answers.roleSalary;
        const roleDepartment = answers.roleDepartment;
        helperDB.addRole(roleName, roleSalary, roleDepartment);
        startPrompt();
    }

    if (answers.leadoff === 'Add Employee') {
        const employeeFirstName = answers.employeeFirstName;
        const employeeLastName = answers.employeeLastName;
        const newEmployeeRole = answers.newEmployeeRole;
        helperDB.addEmployee(employeeFirstName, employeeLastName, newEmployeeRole);
        startPrompt();
    }

    if (answers.leadoff === 'Update Employee Role') {
        const employee = answers.updateEmployeeRole;
        const newRole = answers.updateRole;
        helperDB.updateEmployeeRole(employee, newRole);
        startPrompt();
    }

});
}

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  startPrompt();