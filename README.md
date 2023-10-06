
# Project Documentation

## Overview

This project is a Node.js Express application that serves as an API for interacting with the OpenAI API to generate text completions. It provides an endpoint for sending prompts and receiving text completions.

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)

## Installation

1. Clone the project repository:

   ```sh
   git clone https://github.com/MDRR-DPR-RI/openai-text-generator.git
   ```

2. Navigate to the project directory:

   ```sh
   cd openai-text-generator
   ```

3. Install project dependencies:

   ```sh
   npm install
   ```

## Configuration

1. Create a `.env` file in the project directory.

2. Add your OpenAI API token to the `.env` file:

   ```sh
   OPEN_AI_TOKEN=your-api-token-here
   ```

3. Configure the allowed origins and other CORS settings in the code as needed. By default, the server allows connections from `http://127.0.0.1:8000`.

## Usage

1. Start the server:

   ```sh
   npm start
   ```

2. The server will run on `http://localhost:3000` by default.

3. Use the following endpoints:

   - `GET /`: Check if the server is running. Returns a JSON response with a "connection success" message.

   - `POST /ask`: Send a POST request with a JSON body containing a "prompt" to receive text completions. The server will interact with the OpenAI API and return the completion.

   Example JSON request body for `/ask`:

   ```json
   {
     "prompt": "When is Indonesia's independence day?"
   }
   ```

   Example JSON response:

   ```json
   {
     "success": true,
     "message": "Indonesia's Independence Day is celebrated on August 17th."
   }
   ```
