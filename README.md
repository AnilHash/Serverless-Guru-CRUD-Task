# Project Documentation

## Overview

This project is a serverless CRUD (Create, Read, Update, Delete) application built on AWS Lambda and DynamoDB. It provides API endpoints for managing notes.

## Setup

### Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.

### Configuration

Before running the application, make sure to configure your AWS credentials and environment variables:

1. Configure AWS credentials using AWS CLI or environment variables.
2. Set up environment variables required by the application. Refer to the `.env.example` file for a list of required variables.

### Deployment

The project can be deployed to AWS using the Serverless Framework. Run `serverless deploy` to deploy the application.

## Code Structure

The project consists of the following main components:

1. **Lambda Functions**: Lambda functions handle the API endpoints for CRUD operations on notes. Each function is located in a separate directory under `src/lambdas`.

2. **DynamoDB Table**: The DynamoDB table schema is defined in the `resources/tables/noteTable.yml` file.

3. **Helper Functions**: Helper functions, such as `send` for sending HTTP responses, are located in the `helpers` directory.

4. **AWS SDK Setup**: The AWS SDK setup for DynamoDB client is defined in the `table/NotesTable.ts` file.

## Lambda Functions

### 1. Create Note

**Handler:** `src/lambdas/CreateNote/index.handler`

**Description:** Handles HTTP POST requests to create a new note in the DynamoDB table.

### 2. Update Note

**Handler:** `src/lambdas/UpdateNote/index.handler`

**Description:** Handles HTTP PUT requests to update an existing note in the DynamoDB table.

### 3. Delete Note

**Handler:** `src/lambdas/DeleteNote/index.handler`

**Description:** Handles HTTP DELETE requests to delete a note from the DynamoDB table.

### 4. Get Note

**Handler:** `src/lambdas/GetNote/index.handler`

**Description:** Handles HTTP GET requests to retrieve a single note from the DynamoDB table.

### 5. Get All Notes

**Handler:** `src/lambdas/GetAllNotes/index.handler`

**Description:** Handles HTTP GET requests to retrieve all notes from the DynamoDB table.

## DynamoDB Setup

The DynamoDB table schema is defined in the CloudFormation template `resources/tables/noteTable.yml`. It specifies the table name, key schema, and attribute definitions.

## Conclusion

This project provides a serverless API for managing notes using AWS Lambda and DynamoDB. It follows best practices for serverless architecture and can be easily deployed and scaled on AWS.
