# e-comm-team-amigos-bn

![CircleCI](https://circleci.com/gh/atlp-rwanda/e-comm-team-amigos-bn.svg?style=svg&circle-token=98f879ef16fb4e3428dcc029a5d03636afbeb563)(https://github.com/atlp-rwanda/e-comm-team-amigos-bn/pulls) <a href='https://coveralls.io/github/atlp-rwanda/e-comm-team-amigos-bn?branch=ch-Coveralls-coverage-%23184581165'><img src='https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-amigos-bn/badge.svg?branch=ch-Coveralls-coverage-%23184581165' alt='Coverage Status' /></a>[![HoundCI](https://img.shields.io/badge/houndci-checked-brightgreen.svg)](https://houndci.com)




### How can I test this project

after cloning the repo,

1. in terminal add `npm install`
2. add `.env` file in your repo and assign the variables as there are in `.env.example` file
3. run in termainal `npm run migrate:all` to setup the database
4. run in termainal `npm start` to start the project
5. in your browser add `http://localhost:3000/docs` for documentantion

# Endpoints

## Registration:

`POST /users/signup`

example of request body:


No authentication required
returns a `User` with `success message`

Required fields: `username`, `email`, `password`

## Login:

- First signup a new user and verify the user

`POST /users/login`

Example of request body:



With correct email and password you get the following:

- WITH OUT MFA Response: `{ email: me@mail.com, token : 'jwt token' }`
- WITH MFA Response: `{ message: 'Please check your email for authentication code'}`

Required fields: `email`, `password`


## Mulit-factor authentication
- After a successful login
- Enable MFA with `POST` request at `/users/enable-mfa` provind jwt token
- Get the mfa code from your email

`POST /users/verify-mfa`
Example of request body:


Required fields: 

Example Response: 

- You may also disbale MFA with `POST` request at `/users/enable-mfa` provind jwt token


## profile:
- First signup a new user and verify the user
- then login to get the token
- add your token in header
- note: `token is required`

### get profile

`GET /users/profile`

With correct token you get the following:
- Example Response: 


### change profile

`GET /users/profile`

Example of request body:



`change the token because some data in it was changed too`

## Making user an admin
- please if you are admin be sure to be logged in
- get the token and put it in bearer

`patch /users/create-admin/email`
- where email is email of user to be updated 
- sample response body


## Change password:

`PATCH /users/change-password`

Example of request body:


with correct email,oldPassword and newPassword. the newPassword much meet the criteria of valid password

## PRODUCTS

## Post product
- First signup a new user and verify the user
- then login to get the token
- add your token in header
- note: `token is required`

Example of request body:


if you are a seller you will get this response:

Required fields:

## Update product
- First signup a new user and verify the user
- then login to get the token
- add your token in header
- product must be in your collection
- note: `token is required`

Example of request body:



if you are a seller you will get this response:

Required fields: 

[![CircleCI](https://circleci.com/gh/atlp-rwanda/e-comm-team-amigos-bn.svg?style=svg&circle-token=98f879ef16fb4e3428dcc029a5d03636afbeb563)](https://github.com/atlp-rwanda/e-comm-team-amigos-bn/pulls)

[![HoundCI](https://img.shields.io/badge/houndci-checked-brightgreen.svg)](https://houndci.com)
