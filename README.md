## Feature Reset your pasword via email
### Description
This branch allows a user reset password vial email

### Documentation
POST user/forgetPassword for insert email and send emil of token

PUT auth/ResetPassword for update password used that token

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
