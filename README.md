# Node Serverless ToDo application

The application is a simple cloud based ToDo application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, create a todo items, and process them.

The project is split into two parts:
1. [The Simple Frontend](https://github.com/mitriygor/ucd-capstone-fe):
basic React client web application which consumes the RestAPI Backend based on AWS Lambdas. 
2. [The serverless RestAPI](https://github.com/mitriygor/ucd-capstone-backend): a Node-Express feed microservice.

## Getting Setup

### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).


### Building the Static Frontend Files
The project uses the Serverless framework and AWS Lambda
```bash
serverless deploy
```
