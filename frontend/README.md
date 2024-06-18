# PatientApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Tech stack
- Angular
- Recommended styling framework: Material or Bootstrap
- Spring Boot
- SQL Server

## Database
- If using a Mac in order to run SQL Server you will need docker desktop. 
- Once you have installed Docker download SQL Server
- You can use terminal or use docker to pull the image below:
    `sudo docker pull mcr.microsoft.com/mssql/server:2019-latest`
-SQL will ask you to set up a user and a password    
-Run the following command in the terminal or user Docker Desktop to run the image
    `docker run -d --name sql_server_demo -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=reallyStrongPwd123' -p 1433:1433 mcr.microsoft.com/mssql/server:2019-latest`
        Replace the password with your own
Ensure the container is running is Docker Desktop or with the terminal command `docker ps`
You should see the conatiner information
Install the sql-cli
    Run the command in terminal `npm install -g sql-cli`

Connect to the database
Open terminal and connect to SQL Server using mssql command with your username and password
    `mssql -u sa -p reallyStrongPwd123`
You should see a print out that says connecting to localhost mssql>
This means the connection was successful
Check the connection
You can run `select @@version` to see the version  you are running

## Database Use
You can use the terminal to query or a GUI
Azure Data Studio works well on a Mac 
Follow this link
   ` https://database.guide/how-to-install-azure-data-studio-on-a-mac/`



## Okta
Install the okta cli with brew install --cask oktadeveloper/tap/okta


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/login`. The application will automatically reload if you change any of the source files.

## Angular CLI 
Run `npm install -g @angular/cli@17` to install the angular cli

## Angular Material
Run `ng add @angular/material` to install angular material

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
