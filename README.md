## Feature Reset your pasword via email
### Description
This branch allows a user reset password vial email

### Documentation
POST user/forgetPassword for insert email and send emil of token

PUT auth/ResetPassword for update password used that token

## Setup
To run this application, you'll need the following:

Node.js (v12 or higher)
npm (v6 or higher)
Postgres (v10 or higher) running on your local computer A Postgres user with privileges to create a database and tables
Create a .env file in the root directory of the project, and add the following environment variables: DB_HOST=localhost DB_USER=<your_postgres_username> DB_PASSWORD=<your_postgres_password> DB_NAME=<your_database_name>
 <CLIENT_ID= PUBLIC IDENTIFIER OF THIS APP IN GOOGLE API CONSOLE>
<CLIENT_ID=513503659466-dhgk91q1akv9kkjcul4u5591sqjmb6l6.apps.googleusercontent.com>
<CLIENT_SECRET: SECRET FOR GOOGLE SIGN IN API>
<CLIENT_SECRET=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>

### Dependencies
bcrypt
callsites
chai-http
cors
dotenv
express
joi
lodash.merge
morgan
pg
pg-hstore
rimraf
sequelize
swagger-jsdoc
swagger-ui-express
nodemailer

### Getting Started
Clone this repo git clone https://github.com/atlp-rwanda/e-comm-team-amigos-bn
Switch your working directory cd e-comm-team-amigos-bn
Create an .env file and update it with .env-example
Install all the dependencies by running npm install
Then run the project by typing npm start
Using Postman test user/forgetPassword endpoint by writing POST http://localhost:4000/user/forgetPassword key:Context-Type value: application/json
Using Postman test user/forgetPassword endpoint by writing PUT http://localhost:4000/user/resetPassword/{token}key:Context-Type value: application/json
You can also use http://localhost:3000/docs see the documentation
