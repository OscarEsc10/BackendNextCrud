// This module defines the StarsModel class for interacting with the 'javascript' collection in the 'CrudJs' MongoDB database.
// It uses the MongoDB Node.js driver and loads environment variables with dotenv.

import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

// Create a new MongoClient instance using the MongoDB URI from environment variables
const client = new MongoClient(process.env.MONGO_URI);

// Connect to the MongoDB server (requires Node.js 14+ with top-level await and "type": "module")
await client.connect();

// Get a reference to the 'CrudJs' database and the 'javascript' collection
const db = client.db('CrudJs');
const collection = db.collection('javascript');

// StarsModel provides methods to interact with the 'javascript' collection
class StarsModel {
  // Inserts a new document (star) into the collection
  // star: The star object to insert
  // Returns: The result of the insert operation
  async create(star) {
    return await collection.insertOne(star);
  }

  // Retrieves all documents (stars) from the collection
  // Returns: An array of all star documents
  // Throws: Error if the collection is not initialized
async getAll(page = 1, limit = 10, filter = {}) {
  if (!collection) {
    throw new Error('Collection not initialized.');
  }

  const skip = (page - 1) * limit;

  return await collection.find(filter).skip(skip).limit(limit).toArray();
}

async countDocuments(filter = {}) {
  if (!collection) {
    throw new Error('Collection not initialized. Please check your database connection.');
  }

  return await collection.countDocuments(filter);
}

  // Retrieves a single star document by its ID
  // id: The ObjectId string of the star to retrieve
  // Returns: The star document, or null if not found
  // Throws: Error if the collection is not initialized or the ID format is invalid
  async getStarById(id) {
    if (!collection) {
      throw new Error('Collection not initialized.');
    }
    try {
      // Find a document by its ObjectId
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      // Handle invalid ObjectId format
      throw new Error('Invalid ID format');
    }
  }

  // Deletes a star document by its ID
  // id: The ObjectId string of the star to delete
  // Returns: The result object containing information such as deletedCount
  // Throws: Error if the collection is not initialized or deletion fails
  async deleteStarById(id) {
    if (!collection) {
      throw new Error('Collection not initialized.');
    }
    try {
      // Delete the document with the specified ObjectId
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result; // contains info such as deletedCount
    } catch (error) {
      // Handle errors during deletion
      throw new Error('Error deleting star');
    }
  }

  // Updates a star document by its ID
  // id: The ObjectId string of the star to update
  // data: An object containing the fields to update
  // Returns: The result object containing information about the update operation
  // Throws: Error if the collection is not initialized or update fails
  async updateStarById(id, data) {
    if (!collection) throw new Error('Collection not initialized.');
    try {
      // Update the document with the specified ObjectId, setting new data
      const result = await collection.updateOne({ _id: new ObjectId(id) },
       { $set: data });
      return result;
    } catch (error) {
      // Handle errors during update
      throw new Error('Error updating star');
    }
  }
}

// Export a singleton instance of StarsModel
export default new StarsModel();