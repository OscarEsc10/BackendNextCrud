"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Make sure this CSS module exists or remove if unused

/**
 * HomePage component fetches, displays, updates, and deletes a list of Hollywood stars from the backend API.
 * It provides a table UI with edit and remove actions for each star, and a modal for editing.
 */
export default function HomePage() {
  // State to store the list of stars
  const [stars, setStars] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to control fade-in animation
  const [fadeIn, setFadeIn] = useState(false);
  // State to control if the edit modal is open
  const [isEditing, setIsEditing] = useState(false);
  // State to store the star currently being edited
  const [currentStar, setCurrentStar] = useState(null);
  // State to store the form data for editing
  const [formData, setFormData] = useState({ name: "", email: "", major: "" });

  // Fetch the list of stars from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/hollywoodStars")
      .then((res) => res.json())
      .then((data) => {
        setStars(data);
        setLoading(false);
        setFadeIn(true);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  /**
   * Opens the edit modal and sets the current star and form data.
   * @param {object} star - The star object to edit.
   */
  const handleUpdate = (star) => {
    setCurrentStar(star);
    setFormData({
      name: star.name,
      email: star.email,
      major: star.major,
    });
    setIsEditing(true);
  };

  /**
   * Handles deleting a star by its ID.
   * @param {string} id - The ID of the star to delete.
   */
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/hollywoodStars/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStars((prevStars) => prevStars.filter((star) => star._id !== id));
      } else {
        console.error("Failed to delete the star.");
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };

  /**
   * Handles changes in the edit form inputs.
   * @param {object} e - The input change event.
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Submits the updated star data to the backend API.
   * Closes the modal and refreshes the list on success.
   */
  const submitUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/hollywoodStars/${currentStar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setCurrentStar(null);
        // Optionally refresh data
        fetch("http://localhost:3001/hollywoodStars")
          .then((res) => res.json())
          .then((data) => setStars(data));
      } else {
        console.error("Failed to update the star.");
      }
    } catch (error) {
      console.error("Error during update request:", error);
    }
  };

  return (
    <main className={`min-h-screen p-6 ${styles.wrapper || ""}`}>
      {/* Page title */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Javascript's Crud
      </h1>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div
          role="status"
          className="flex flex-col justify-center items-center h-64 gap-4 animate-fadeIn"
        >
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full border-4 border-blue-500 border-dashed animate-spinCustom \
            shadow-blue-500 shadow-lg"
            ></div>
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full animate-pulse border border-blue-400"></div>
          </div>
        </div>
      ) : (
        <div
          className={`mx-auto w-full max-w-6xl overflow-x-auto rounded-3xl bg-gradient-to-br from-gray-950 \
            via-gray-900 to-gray-950 p-6 shadow-2xl transition-all duration-700 ease-out ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {/* Table displaying the list of stars */}
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-gray-800 text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 tracking-widest">Name</th>
                <th className="px-6 py-3 tracking-widest">Email</th>
                <th className="px-6 py-3 tracking-widest">Major</th>
                <th className="px-6 py-3 text-center tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {stars.map((star, index) => (
                <tr
                  key={star._id}
                  className={`border-b border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {star.name}
                  </td>
                  <td className="px-6 py-4">{star.email}</td>
                  <td className="px-6 py-4">{star.major}</td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    {/* Edit button opens the edit modal for this star */}
                    <button
                      onClick={() => handleUpdate(star)}
                      className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all \
                      duration-300 hover:scale-105 hover:bg-blue-400 hover:text-black active:scale-95 cursor-pointer"
                    >
                      ✏ Edit
                    </button>
                    {/* Remove button deletes this star */}
                    <button
                      onClick={() => handleDelete(star._id)}
                      className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all \
                      duration-300 hover:scale-105 hover:bg-red-400 hover:text-black active:scale-95 cursor-pointer"
                    >
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Edit modal for updating a star */}
          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96 space-y-4 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Update
                </h2>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
                  placeholder="Major"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitUpdate}
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-400 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
