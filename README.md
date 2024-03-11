# OCS task for Tech Cell Manager
This is a simple calendar application that shows day wise events. It is built using React and MUI for frontend and Node.js + Express + MySQL for backend.

## URL
- [OCS Calendar](https://ocs.iith-ac.in/calendar)

## Design, Technology and commands used
- Frontend
    - Technology
        - React
        - MUI
        - Axios
    - Design
        - The frontend is designed using MUI components to meet the specfications described in the task.
        - It is divided into components for better maintainability and reusability.
        - MUI Box, Typography, Card, Button and icons are extensively used.
        - The calendar is yet another MUI component but the cells are customized to show the count of the events.
        - The day view and events list is also designed using MUI components (Mostly Box and Typography).
    - Commands
        - `npx create-react-app calendar` to create the react app
        - `npm start` to run the application in dev mode
        - `npm run build` to build the application
        - `scp -r build/* user@server:/path/to/destination` to copy the build to the server
        - NginX setup
            - `sudo apt-get install nginx`
            - `vim /etc/nginx/sites-available/ocs.iith-ac.in` to edit conf files
            - `sudo ln -s /etc/nginx/sites-available/ocs.iith-ac.in /etc/nginx/sites-enabled`
            - `sudo nginx -t` to check for errors
            - `sudo systemctl restart nginx` to restart the server
- Backend
    - Technology
        - Node.js
        - Express
        - MySQL
        - Sequelize
    - Design
        - The backend is designed using Node.js and Express.
        - It is divided into routes, controllers and models for better maintainability and reusability.
        - Sequelize is used as the ORM for MySQL.
        - The routes are designed to handle the requests for the events.
        - The controllers are designed to handle the requests and send the response.
        - The models are designed to interact with the database.
        - The sequelize connects to the GCP MySQL server over internet through password authentication.
        - The username, hostname and password are stored in .env file for security reasons.
    - Commands
        - Node setup
            - `npm init -y`
            - `yarn`
            - `npm install nodemon`
            - `nodemon index` to run the application
        - Certificates
            - `certbot certonly` and entered domain names
- Database server
    - Rented GCP MySQL
    - allowed access to the MySQL server from the IP address of the backend server
    - The database has a table to store the events and their details.

- Hosting
    - Rented a server from GCP and installed Ubuntu 22.04 LTS. This works as both frontend and backend servers. Frontend in on port 443 and backend on port 5000.
    - The frontend is hosted on the server using NginX.
    - The backend is hosted on the server using Node.js.
    - The database is hosted on GCP.
    - The domain is from hostinger.
