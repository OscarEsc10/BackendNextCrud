// Import the star model for database operations
import StarsModel from "../models/starsModel.js";

// Controller class for managing star-related operations
class StarControllers {
  constructor() {
    // Constructor can be used for initialization if needed
  }

  // Create a new star document in the database.
  // req: Express request object containing the star data in req.body
  // res: Express response object
  async create(req, res) {
    try {
      const star = await StarsModel.create(req.body); // Call the create method from the star model
      res.status(201).json(star); // Respond with the created star
    } catch (error) {
      res.status(500).json({ message: "Error creating star", error }); // Handle errors
    }
  }

  // Update an existing star by ID.
  // req: Express request object containing star ID in req.params and updated data in req.body
  // res: Express response object
  async handleUpdate(req, res) {
    try {
      const { id } = req.params; // Get star ID from request parameters
      const data = req.body; // Get updated data from request body

      // Attempt to update the star by ID using the provided data
      const result = await StarsModel.updateStarById(id, data);

      // If no document was matched, the star was not found
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Star not found" });
      }

      // Respond with a success message if update was successful
      res.status(200).json({ message: "Star updated successfully" });
    } catch (error) {
      // Handle errors and respond with a 500 status code
      res.status(500).json({
        message: "Error updating star",
        error: error.message || error,
      });
    }
  }

  // Delete a star by ID.
  // req: Express request object containing star ID in req.params
  // res: Express response object
  async handleDelete(req, res) {
    try {
      const { id } = req.params; // Get star ID from request parameters
      const result = await StarsModel.deleteStarById(id); // Attempt to delete the star by ID

      // If no document was deleted, the star was not found
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Star not found" });
      }

      // Respond with a success message if deletion was successful
      res.status(200).json({ message: "Star deleted successfully" });
    } catch (error) {
      // Handle errors and respond with a 500 status code
      res.status(500).json({
        message: "Error deleting star",
        error: error.message || error,
      });
    }
  }

  // Get all stars from the database.
  // req: Express request object
  // res: Express response object
  async getAll(req, res) {
    try {
      const limit = parseInt(req.query.limit); // Get limit from query or default to 10
      const page = parseInt(req.query.page); // Get page from query or default to 1
      const stars = await StarsModel.getAll(page, limit); // Call the getAll for list of stars
      res.status(200).json(stars); // Respond with the list of stars
    } catch (error) {
      res.status(500).json({ message: "Error fetching stars", error }); // Handle errors
    }
  }

  // Get a single star by ID.
  // req: Express request object containing star ID in req.params
  // res: Express response object
  async getOne(req, res) {
    try {
      const { id } = req.params; // Get star ID from request parameters
      const star = await StarsModel.getStarById(id); // Fetch the star by ID

      if (!star) {
        return res.status(404).json({ message: "Star not found" }); // Star not found
      }

      res.status(200).json(star); // Respond with the found star
    } catch (error) {
      console.error(error); // Log error details
      res.status(500).json({
        message: "Error fetching star",
        error: error.message || error,
      }); // Handle errors
    }
  }

  // Controller method to retrieve paginated and filtered list of stars
  async getPaginatedStars(req, res) {
    try {
      // Get query parameters or use default values
      const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
      const limit = parseInt(req.query.limit) || 6; // Number of items per page (default: 6)
      const search = (req.query.search || "").trim(); // Optional search term

      // Dynamic filter: performs case-insensitive partial match on "name"
      const filter = {
        name: { $regex: search, $options: "i" },
      };

      // Count total documents that match the filter
      const total = await StarsModel.countDocuments(filter);

      // Retrieve paginated data from database based on page, limit, and filter
      const stars = await StarsModel.getAll(page, limit, filter);

      // Return successful response with data and pagination info
      res.status(200).json({
        data: stars, // The stars found
        total, // Total number of matching records
        page, // Current page
        totalPages: Math.ceil(total / limit), // Total number of pages
      });
    } catch (error) {
      // Handle any unexpected errors
      res.status(500).json({
        message: "Error while fetching paginated stars",
        error: error.message || error,
      });
    }
  }
}

// Export an instance of the StarControllers class
export default new StarControllers();
