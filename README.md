# Employee-Tracker

## Description

The Employee-Tracker is an CLI application used to keep track of your businesses Departments, Roles, and Employees. My motivation for creating this application was to help anyone who owns a business keep track of their Departments, Roles, and Employees straight from the command line. During the process of building this application I learned how to utilize SQL to create a database, connect it to a server using mysql2, and then use queries to add data or view it depending on the user prompt. I struggled with creating queries to help join and add to my database. I also struggled with creating a relationship between the employees and manager.

## Future Devlopment

For the future development of this application I plan on creating a better relationship for the manager and the employee keys within SQL. There is also a bug where viewing the tables won't start the inquirer prompt again that needs to be fixed. 

## Installation 

1. Git clone the repository using the following command: git clone git@github.com:StunnaDawg/Employee-Tracker.git
2. Through the CLI cd into the Employee-Tracker directory
4. Make sure to have nodejs(https://nodejs.org/) and Mysql(https://www.mysql.com/)
3. Ensure to 'npm install' all the dependencies
4. Run 'node index.js' to start the server and prompts
    - NOTE: When selecting 'View all Employeees', 'View all Roles', or 'View all Departments' you will need to RESTART the server using 'node index.js' due to a bug in the current version.
5. Answer the prompts to add your data to the tables.

## Usage

Upon downloading the application make sure you do the following:
- run 'npm install' so that the dependcies are installed
  - If the dependencies do not exist: run 'npm i inquirer@8.2.4', 'npm i express', 'npm i mysql2', and 'npm i console.table' to download the latest version of each npm
- run 'node index.js' to recieve the question prompts'

## Screenshots

![Alt](./assets/images/Screenshot%202023-04-12%20at%207.13.26%20PM.png)
![Alt](./assets/images/Screenshot%202023-04-12%20at%207.14.33%20PM.png)
![Alt](./assets/images/Screenshot%202023-04-12%20at%207.15.28%20PM.png)

## Demo Video Link

Link: https://watch.screencastify.com/v/mxDm7DgpvA7pB21UMRiv

## Dependencies

- nodeJS: https://nodejs.org/en
- mysql2: https://www.mysql.com/ 
- inquirer: https://www.npmjs.com/package/inquirer
- express: https://www.npmjs.com/package/express 
- console.table: https://www.npmjs.com/package/console.table?activeTab=readme

