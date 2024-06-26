# Passenger Reward Application

This is a backend application for managing passenger rewards.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository: 
```sh
git clone https://github.com/Omolounnu-Oluwafemi/passenger-reward.git
```

3. Navigate into the project directory: 
```sh
 cd passenger-reward
```

4. Install the dependencies:
```sh
yarn install
```

## Running the Application

To start the application, run: 
```sh
yarn start
```


## Running the Tests

To run the tests, run: 
```sh
yarn test
```

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server

## API Endpoints

- `/transactions`: Endpoint for managing transactions
- `/users`: Endpoint for managing users

## CORS

This application uses CORS to allow requests from the following origins:

- `http://localhost:5173`
- `https://passenger-reward-clientside.vercel.app`

## Live Version

The live version of the API is hosted at `https://passenger-reward.onrender.com`
