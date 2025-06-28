// Load environment variables from the .env file into process.env
// i can use the import because i have set the type in package.json to module

import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';


// Get the connection string (URI) from the environment variables
const uri = process.env.MONGO_URI;

// Create a new MongoClient instance using the URI
const client = new MongoClient(uri);

// Define an asynchronous function to run the database operations
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // Access the specific database (CrudJs)
    const db = client.db('CrudJs');

    // Access the specific collection within the database (javascript)
    const collection = db.collection('javascript');

    // Retrieve all documents from the collection and convert them to an array
    const documents = await collection.find().toArray();

    // Filter by one ID to retrieve a specific document
    // const documents = await collection.findOne({_id: new ObjectId ('6856fc5e8f32431dd976427c')});

    // Print the documents to the console
    console.log(documents);
  } catch (error) {
    // Catch and log any errors during the process
    console.error('❌ Connection error:', error);
  } finally {
    // Ensure the MongoDB client is closed after the operation finishes
    await client.close();
  }
}

// Execute the function
run();