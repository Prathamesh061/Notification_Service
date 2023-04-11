# Notification_Service

This project is aimed at developing a notification service for a real-world application using Node.js, Express.js, and Mongodb. The project utilizes NodeMailer, Mailgen, and Node-Cron to simplify the development process. With the help of these tools, building the notification service has become an easy task.

This project allows you to perform the following actions:

1. Sign up a user
2. Sign in a user

Additionally, in the background, the system sends a welcome email to new users every 30 seconds.


## Configuration 

Please configure the .env file with your own credentials before running the project. Replace the placeholders with your actual values:

```sh
GMAIL=your_email_address
GMAIL_PASS=your_app_password (not email_password)
PORT=8000
DB_URL=your_database_url
```
read [Nodemailer](https://nodemailer.com/about/) for more detail...

## Installation

this app requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies and start the server.

Before starting the server please ensure mongodb server is locally installed and running on the default port

```sh
cd Find-My-Restaurant
npm install
npm run start or npm run dev
```

## Rest endpoints

1. Sign up request
```sh
POST /api/v1/auth/signup
Sample request body:
{
    "name":"Prathamesh Lakhapati",
    "userId": "Prathamesh06",
    "email" :"lakhapatiprathmesh0123@gmail.com",
    "password": "Admin@123"
}

Sample response body:
{
    "name": "Prathamesh Lakhapati",
    "userId": "Prathamesh06",
    "email": "lakhapatiprathmesh0123@gmail.com",
    "sentWelcomeEmailStatus": "UN_SENT",
    "createdAt": "2023-04-11T10:44:28.929Z",
    "updatedAt": "2023-04-11T10:44:28.929Z"
}
```

2. Sign in request 
```sh
POST /api/v1/auth/signin
Sample request body:
{
    "userId": "Prathamesh06",
    "password": "Admin@123"
}

Sample response body: 
{
    "name": "Prathamesh Lakhapati",
    "userId": "Prathamesh06",
    "email": "lakhapatiprathmesh0123@gmail.com",
    "sentWelcomeEmailStatus": "SENT"
}
```
