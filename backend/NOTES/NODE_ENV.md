## NODE_ENV=development 
    is an environment variable that tells  Node.js backend which environment it is running in.
    For Nilus Kitchen Demo 4 project,  do not need to generate it or obtain it from a website. can write it   in   .env file.
1. What does NODE_ENV=development mean?
- NODE_ENV is the variable name.
- development is its value, meaning   currently developing and testing   application.
NODE_ENV=development


    This is a conventional setting used by Node.js applications and libraries to distinguish development from testing or production.

2. What values can it have?
    Value	            When use it
    development	        While building and testing locally on
                        computer.
    production	        When running   deployed, live application.
    test	            When running automated tests.
    
These are conventional values, not values need to generate. Node.js itself doesn't automatically change the variable for  .

3. Does it change anything in   project?
Only if   code or a library checks it. For example, could use it to display detailed error messages during development but hide internal error details in production.

    if (process.env.NODE_ENV === "development") {
    console.log("Development mode is active");
    }

    Here, the condition checks whether the variable's value is exactly "development".
    Some frameworks and libraries also use NODE_ENV to adjust their behavior.

4. What should   put in .env file?
For current local backend, keep:
NODE_ENV=development


## When deploying backend, 
    set the production environment variable through   hosting provider's environment settings:
    NODE_ENV=production


    normally should not commit   private .env file to GitHub. Configure production environment variables in   hosting provider instead.

## PORT=5000 is the port   
    Express server listens on; 
## NODE_ENV=development 
    describes the environment in which   backend runs. choose both values, but they serve different purposes.