// Import MongoClient from the mongodb package
import {MongoClient} from 'mongodb';
// Import environment variables from .env file
import 'dotenv/config';

// Get the connection string (URI) from the environment variables
const uri = process.env.MONGO_URI;

// Class to handle MongoDB connection for stars database
class dbStarsConnect {
    constructor() {
        // Set the MongoDB client using the connection URI
        const queryString = uri; // This should be replaced with the actual URI variable
        this.client = new MongoClient(queryString)
        this.connect(); // Call the connect method to establish a connection
    }

    // Method to connect to the MongoDB database
    async connect() {
        try {
            await this.client.connect(); // Attempt to connect
            console.log('✅ Connected to MongoDB'); // Success message
        } catch (error) {
            console.error('❌ Connection error:', error); // Error message
        }
    }
}

// Export the dbStarsConnect class for use in other files
export default dbStarsConnect;