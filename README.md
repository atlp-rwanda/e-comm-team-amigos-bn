![CircleCI](https://circleci.com/gh/atlp-rwanda/e-comm-team-amigos-bn.svg?style=svg&circle-token=98f879ef16fb4e3428dcc029a5d03636afbeb563)<a href='https://coveralls.io/github/atlp-rwanda/e-comm-team-amigos-bn?branch=ch-Coveralls-coverage-%23184581165'><img src='https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-amigos-bn/badge.svg?branch=ch-Coveralls-coverage-%23184581165' alt='Coverage Status' /></a>
[![HoundCI](https://img.shields.io/badge/houndci-checked-brightgreen.svg)](https://houndci.com)

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

This is an amigos e-commerce backend app

### Tech Stack

- []() Node.js
- []() Express
- []() Postgres DB
- []() Sequelize ORM
- []() Socket Technology

## Getting Started

To use this locally.

### Prerequisites

- []() Node.js
- []() Package manager. We are using [npm](https://www.npmjs.com/)
- []() Postgres DB
- []() Git

### Installation

1. Clone the repo 💫
   ```sh
   git clone https://github.com/atlp-rwanda/e-comm-team-amigos-bn.git
   ```
2. Install packages 📦.
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following keys ,or, just grab the content in `.env.example` :
   ```sh
    PORT=
    DB_USER=
    DB_HOST=
    DB_NAME=
    DB_PASSWORD=
    DB_PORT=
   ```
4. Set up docker
```
 Set environment variables. Set DB_HOST to db
 Run `docker compose up -d db` to run postgres container
 Run `docker compose logs` to check if database is ready for connection.
 Run `docker compose build` to build Docker image.
 Run `docker compose up app`
 Run `docker compose exec -it app npx sequelize-cli db:migrate` to create tables
```

5. Start your local development server

```sh
npm run dev
```

## Usage
Test the endpoints on the swagger interface 🧪 :  
[Swagger Documentation](https://e-comm-team-amigos-bn-project.onrender.com/docs)

## Contributing 

To make contributions...

1. Clone the repo
1. Create your Feature Branch `git checkout -b ft-some-feature`
1. Commit your Changes `git commit -m 'ft: add some feature'`
1. Push to the Branch `git push origin ft-some-feature`
1. Open a Pull Request 👊

## License

Distributed under the MIT License.