# contact-list

## Description

This is a contact list app that allows you to add, edit, and delete contacts. It also allows you to search for contacts by name.

## Table of Contents

- [Installation](#installation)
- [Database](#database)
- [Technologies](#technologies)
- [Dependencies](#dependencies)

## Installation

To install necessary dependencies, run the following command:

To install the dependencies for the frontend, run the following command:

```
cd client
npm install
npm start
```

To install the dependencies for the backend, run the following command:

```
cd Backend
npm install
npm start
```

To run both the frontend and backend concurrently, run the following command:

```
npm run insall // This command will install the dependencies for both the frontend and backend
npm run develop // This command will run both the frontend and backend concurrently
```

## Database

The database used in this project is MongoDB. To connect to the database you need to create a .env file in the Backend folder and add the following line:

```
MONGODB_URI= "mongodb+srv://naodhunde:naodhunde@cluster0.wkctxr9.mongodb.net/contactList?retryWrites=true&w=majority"
```

## Technologies

- React
- Node.js
- Express.js
- MongoDB

## Dependencies

for the backend:

- "body-parser": "^1.20.2",
- "cors": "^2.8.5",
- "express": "^4.18.2",
- "mongoose": "^7.2.1",
- "multer": "^1.4.5-lts.1",
- "nodemon": "^2.0.22",
- "vcard-parser": "^1.0.0",
- "vcards-js": "^2.10.0",
- "vcf": "^2.1.1"

for the frontend:

- @emotion/react": "^11.11.0",
- "@emotion/styled": "^11.11.0",
- "@fontsource/roboto": "^5.0.2",
- "@mui/icons-material": "^5.11.16",

- "@mui/material": "^5.13.3",
- "@mui/styles": "^5.13.2",
- "@testing-library/jest-dom": "^5.16.5",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "axios": "^1.4.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-router-dom": "^6.11.2",
- "react-scripts": "5.0.1",
- "web-vitals": "^2.1.4"
