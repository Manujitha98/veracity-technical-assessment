# veracity-technical-assessment

This is a repo to hold the full stack application for the purpose of completing the Veracity technical assessment.

##  The app uses the following technologies:
    Node Server (Express)(TypeScript) 
    React - Frontend
    MySQL - Database
    TypeORM - ORM
    Docker - Containerization
    Axios - HTTP Client
    React Router - Routing
    React Bootstrap - Styling
    PM2 - Process Manager

## Prerequisites

You will need to have the following installed on your machine:
-Docker (https://docs.docker.com/get-docker/)
OR
-Node JS (https://nodejs.org/en/download/)

if you dont want to use docker, you can always install node js and install the dependencies manually through npm.

#### create a .env file and add the MOVIES_API_KEY variable. get your own API key from https://www.themoviedb.org/

MOVIES_API_KEY=your_api_key

# Running the application with docker

To run the application, you will need to run the following commands:

```console
docker-compose up

```
The application will be live on `localhost:3000/`


# Running the application without docker

### Database

First you will have to set up a mysql database and create a database called veracity.

Then you will have to create a .env file in the back-end folder and add the following variables:

```console
DB_HOST=your database host
DB_USER=your database user
MYSQL_ROOT_PASSWORD=your database password
DB_NAME=veracity
```

### Backend- navigate to the back-end folder and run the following command

```console
npm install
```

Then run the following command

```console
npm run build
  ```
Then run the following command

```console
npm run start
  ```

### Front-End - navigate to the front-end folder and run the following command

```console
npm install
  ```

Then run the following command

```console
npm run build
  ```

Then run the following command

```console
npm install -g serve
  ```

Then run the following command

```console
serve -s build
```

