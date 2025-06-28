// Import environment variables from .env file
// i can use the import because i have set the type in package.json to module
import 'dotenv/config';

// Import the router for Hollywood stars
import hollywoodStars from './routes/hollywoodStars.js'; 

// Import the Express framework
import express from 'express';

import cors from 'cors'; // Import CORS middleware for handling cross-origin requests

import bodyparser from 'body-parser'; // Import body-parser middleware for parsing request bodies

// Create an instance of the Express application
const app = express(); 

app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(bodyparser.json()); // Middleware to parse JSON request bodies
app.use(bodyparser.urlencoded({ extended: true })); // Middleware to parse URL-encoded request

app.use('/hollywoodStars', hollywoodStars); // Use the stars router for handling requests to /stars

try {
    // Set the port from environment variable or use 3000 as default
    const PORT = process.env.PORT || 3001;
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

// Handle any errors that occur during server startup
}catch (error) {
  console.error('Error starting the server:', error);
}