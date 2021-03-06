const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const path = require("path");
const OUTPUT_DIR = path.resolve (__dirname, "output");
const outputPath = path.join (OUTPUT_DIR, "index.html");
const render = require ("./src/template.js");

let Staff = [];

// manager questions
const questions = {

    Manager: [
    {
        type: "input",
        message: "Please Enter Team Manager's name: ",
        name: "name",
    },
    {
        type: "input",
        message: "Please Enter Team Manager's Email: ",
        name: "email",
    },
    {
        type: "input",
        message: "Please Enter Team Manager's ID: ",
        name: "id",
    },
    {
        type: "input",
        message: "Please Enter Team Manager's Office Number: ",
        name: "officeNumber",
    },
    ],


    Engineer: [
    {
        type: "input",
        message: "Please Enter Engineer's name: ",
        name: "name",
    },
    {
        type: "input",
        message: "Please Enter Engineer's Email: ",
        name: "email",
    },
    {
        type: "input",
        message: "Please Enter Engineer's ID: ",
        name: "id",
    },
    {
        type: "input",
        message: "Please Enter Engineer's Github username: ",
        name: "github",
    },
    ],

     Intern: [
    {
        type: "input",
        message: "Please Enter Intern's name: ",
        name: "name",
    },
    {
        type: "input",
        message: "Please Enter Intern's Email: ",
        name: "email",
    },
    {
        type: "input",
        message: "Please Enter Intern's ID: ",
        name: "id",
    },
    {
        type: "input",
        message: "Please Enter Intern's University/College Name: ",
        name: "school",
    },
    ]
};

const selectRole = [
    {
        type: "list",
        name: "role",
        message: "Please choose the role for the employee:",
        choices: ["Manager", "Engineer", "Intern"],
    }
];

function addNewEmployee() {
  inquirer.prompt(selectRole)
    .then(response => {
        if (response.role === "Manager") {
             // if (canAddManager) {
                inquirer.prompt(questions.Manager)
                    .then(response => {
                        const manager = 
                            (
                                response.name,
                                response.id,
                                response.email,
                                response.officeNumber
                            );
                        Staff.push(manager);
                        // canAddManager = false;
                        if (response.addNew === "yes") {
                            addNewEmployee();
                        } else {
                            generate();
                        }
                    });
            // } else {
            //     //only 1 manager
            //     console.log("There is a manager already!")
            //     addNewEmployee();
            // }

        } else if (response.role === "Engineer") {
            inquirer.prompt(questions.Engineer)
                .then(response => {
                    const engineer = new Engineer
                        (
                            response.name,
                            response.id,
                            response.email,
                            response.github
                        );
                    Staff.push(engineer);
                    if (response.addNew === "yes") {
                        addNewEmployee();
                    } else {
                        generate();
                    };
                });

        } else if (response.role === "Intern") {
            inquirer.prompt(questions.Intern)
                .then(response => {
                    const intern = new Intern
                        (
                            response.name,
                            response.id,
                            response.email,
                            response.school
                        );
                    Staff.push(intern);
                    if (response.addNew === "yes") {
                        addNewEmployee();
                    } else {
                        generate();
                    };
                });
        };
    });
};

addNewEmployee();

function generate() {
    console.log (Staff);
fs.writeFileSync(outputPath, render(Staff), "utf-8");
process.exit(0);
}

