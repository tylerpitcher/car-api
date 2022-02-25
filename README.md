# Car API
[![Supertest-All](https://github.com/tylerpitcher/car-api/actions/workflows/test.yml/badge.svg)](https://github.com/tylerpitcher/car-api/actions/workflows/test.yml) <br />
A REST API for cars, created using Express.js and test-driven development.
All tests can be found in <a href="https://github.com/tylerpitcher/car-api/tree/main/api_test">api_test</a>.
```
├── LICENSE
├── README.md
├── .github
│   └── workflows
│       └── test.yml
├── api
│   ├── db
│   │   ├── database.js ======> SQL query builder for database
│   │   └── knex.js     ======> Connects SQL query builder with db.sqlite
│   ├── routes
│   │   ├── car.js      ======> Handles all request to /car
│   │   └── user.js     ======> Handles all request to /user
│   ├── main.js         ======> Main file to run application
│   └── server.js       ======> Meeting point for all routes
├── api_tests
│   ├── car.test.js     ======> Tests all /car routes
│   └── user.test.js    ======> Tests all /user routes
├── node_modules
├── db.sqlite           ======> Blank db file
├── package-lock.json
└── package.json
```
