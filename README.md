## Feature User Signup [![CircleCI](https://circleci.com/gh/atlp-rwanda/e-comm-team-amigos-bn.svg?style=svg&circle-token=98f879ef16fb4e3428dcc029a5d03636afbeb563)](https://github.com/atlp-rwanda/e-comm-team-amigos-bn/pulls) <a href='https://coveralls.io/github/atlp-rwanda/e-comm-team-amigos-bn?branch=ch-Coveralls-coverage-%23184581165'><img src='https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-amigos-bn/badge.svg?branch=ch-Coveralls-coverage-%23184581165' alt='Coverage Status' /></a>

# Description

This branch contains different endpoints which allow users with specific privileges to perform defined role in the system.

## Documentation

`GET /users`

`POST /role/create`

`GET /roles`

`POST /permission/create`

`GET /permissions`

`POST /role/set`

`POST /permission/set`

`GET /user/role`

`GET /role/permission`


## Setup

To run this application, you'll need the following:

- Node.js (v12 or higher)
- npm (v6 or higher)
- Postgres (v10 or higher) running on your local computer
  A Postgres user with privileges to create a database and tables
- Create a .env file in the root directory of the project, and add the following environment variables:
DB_HOST=localhost
DB_USER=<your_postgres_username>
DB_PASSWORD=<your_postgres_password>
DB_NAME=<your_database_name>


### Dependencies

### Getting Started

- Clone this repo git clone https://github.com/atlp-rwanda/e-comm-team-amigos-bn
- Switch your working directory cd e-comm-team-amigos-bn
- Create an .env file and update it with .env-example
- Install all the dependencies by running npm install
- Then run the project by typing npm start
- Using Postman test user/create endpoint
by writing POST http://localhost:3000/user/create
key:Context-Type value: application/json
- You can also use `http://localhost:3000/docs` see the documentation
