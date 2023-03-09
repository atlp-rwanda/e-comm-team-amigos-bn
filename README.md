[![CircleCI](https://circleci.com/gh/atlp-rwanda/e-comm-team-amigos-bn.svg?style=svg&circle-token=98f879ef16fb4e3428dcc029a5d03636afbeb563)](https://github.com/atlp-rwanda/e-comm-team-amigos-bn/pulls)

<a href='https://coveralls.io/github/atlp-rwanda/e-comm-team-amigos-bn?branch=ch-Coveralls-coverage-%23184581165'><img src='https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-amigos-bn/badge.svg?branch=ch-Coveralls-coverage-%23184581165' alt='Coverage Status' /></a>

#### 184581170 Setup Docker for Backend Application

#### Branch Description

Set up docker compose yml file to run express server and postgress services.

#### How should it be tested.

First make sure you have docker installed. In your terminal;

1. Set environment variables. NB: **Set DB_HOST to `db`**
2. Run `docker compose up -d db` to run postgres container
3. Run `docker compose logs` to check if database is ready for connection.
4. Run `docker compose build` to build Docker image.
5. Run `docker compose up app`
6. Run `docker compose exec -it app npx sequelize-cli db:migrate` to create tables
7. Use Postman or any other api testing app to make the following request on 127.0.0.01:3000;
   - `POST /user/create` Body request {userName, email, password}
   - `GET /user/all`
