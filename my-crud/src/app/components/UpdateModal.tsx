// components/EditModal.tsx

import React from "react";

/**
 * Props interface for the EditModal component
 */
interface UpdateModalProps {
  isEditing: boolean; // Determines if the modal is open
  formData: {
    name: string;
    email: string;
    major: string;
  }; // Holds the form values for the star being edited
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Called when an input field is changed
  submitUpdate: () => void; // Called when the Save button is clicked
  setIsEditing: (val: boolean) => void; // Toggles modal visibility
  errorMessage: string; // Message shown if validation fails
  setErrorMessage: (val: string) => void; // Updates the error message
}

/**
 * EditModal displays a modal dialog for editing an existing Hollywood star.
 * It includes input fields for name, email, and major, with validation and error handling.
 */
const UpdateModal: React.FC<UpdateModalProps> = ({
  isEditing,
  formData,
  handleEditChange,
  submitUpdate,
  setIsEditing,
  errorMessage,
  setErrorMessage,
}) => {
  // If the modal is not active, return nothing
  if (!isEditing) return null;

  return (
    // Modal overlay with dark background to cover rest of the UI
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 scroll-hidden">
      {/* Modal content box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96 space-y-4 animate-fade-in">
        {/* Modal heading */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Update
        </h2>

        {/* If there's an error (e.g., invalid email or empty fields), show it here */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative animate-fade-in">
            {errorMessage}
          </div>
        )}

        {/* Input: Name */}
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleEditChange}
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Name"
        />

        {/* Input: Email */}
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleEditChange}
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Email"
        />

        {/* Input: Major */}
        <input
          type="text"
          name="major"
          autoComplete="off"
          value={formData.major}
          onChange={handleEditChange}
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Major"
        />

        {/* Button row: Cancel and Save actions */}
        <div className="flex justify-end gap-3 mt-4">
          {/* Cancel closes modal and resets errors */}
          <button
            onClick={() => {
              setIsEditing(false);
              setErrorMessage("");
            }}
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>

          {/* Save triggers form submission */}
          <button
            onClick={submitUpdate}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-400 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;