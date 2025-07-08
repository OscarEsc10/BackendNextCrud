// Import the Express framework
import express from 'express';
// Import the controller for handling Hollywood stars logic
import starsController from '../controllers/hollyStars.js';

// Create a new router instance
const hollywoodStars = express.Router();

// Route to update a star by ID
hollywoodStars.put('/:id', starsController.handleUpdate);
// Route to create a new star
hollywoodStars.post('/', starsController.create);
// Route to get all stars
// Route to get a single star by ID
hollywoodStars.get('/:id', starsController.getOne);
// Route to delete a star by ID
hollywoodStars.delete('/:id', starsController.handleDelete);

// Route to get paginated stars
hollywoodStars.get('/', starsController.getPaginatedStars);

// Export the router to be used in the main app
export default hollywoodStars;