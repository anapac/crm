#
# A project:

by anapac (Anatoly Pachev)

#
# A Simple Customer Relations Manager v0.1.0

A simple Customer Management System (CRM) catering primarily to the needs of small organizations and business individuals.

The main system functionality revolves around the aspects of storing, organizing and looking up the contact details of companies and individuals that are somehow related to or are of interest to the administrators of the CRM.

## Architecture

The project represents a full-stack Single Page Application (SPA) implementation aiming to fully contain all functional and aesthetic aspects of the aforementioned application and provide for a fluid and seamless UX.

The backend of the application runs on top of two web-servers (Node.js) and a document database (MongoDB). One instance of Node.js is responsible for the communication to the web clients and the other – for the communication to the database. The two servers share a proxy arrangement, whereby requests that are part of the application API-layer are relayed to the API server and the responses are routed back to the clients.

The web server instance dealing with the data API of the system uses the Hapi.js server-side framework to effectively route and handle the incoming requests and outgoing responses. The database only communicates with the Hapi.js server.

The frontend functionality is executed in its entirety using the React.js framework, that is responsible for routing client requests to specific views and managing the overall flow of context and state binding the distinct parts of the UX. All communications between client browsers and the primary web server are executed on top of AJAX asynchronous requests provided by jQuery.

The backend of the CRM will be built on top of _node.js_ and _hapi.js_ with data management done in _MongoDB_; the frontend will be executed primarily in _React_ and _jQuery_, leveraging the frameworks&#39; abilities to provide a full and seamless SPA experience to the end user.

The code base of the project (both, backend and frontend) is centered on JavaScript and, more specifically, on ECMAScript 2015 (ES6).

## **Project Configuration**

In order to start the project, you will need the latest versions of _Node.js_ and _MongoDB_ preinstalled.

After cloning the project contents from GitHub.com, you will need to run the following command in the system console/ terminal in the project directory/ folder to initialize the build environment:

npm install

The only additional configuration that has to be done is in the file **.env** in the main project folder. The settings in this file are used to customize the way the two Node.js instances and the database service run. It includes the settings for their respective hosts and ports as well as some authentication information needed for the API web-server to connect to the MongoDB service.

_Note: MongoDB client authentication may have to be expressly turned on for the application to run properly._

## **Project Description**

The application backend part (code and configuration) consists mainly of the following file system locations:

- **assets** folder (includes static content like images and CSS);
- **mongo-scripts** folder (currently contains a single script used for seeding the database with data for test purposes);
- **routes** folder – houses the routing information and handlers for the Hapi.js web-server instance;
- **schemas** folder – the Mongoose ODM schema definitions used for validating all database operations;
- **backend.js** – the Hapi.js web-server entry point.

The client part is concentrated in the **app** folder. The code in this folder drives the React framework part of the implementation. The single point of entry is the **app-entry.js** file that initializes the React router and renders the frontend web-server capable of serving the application&#39;s views/ React components. All React components are represented in JSX that is transpiled to ES5 by Babel inside the client&#39;s browser.

The top-level application component is called AppLayout.jsx.