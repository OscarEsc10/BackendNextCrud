"use client";
import React, { useEffect } from "react";

/**
 * Props for the CreateModal component
 */
interface CreateModalProps {
  isCreating: boolean; // Controls modal visibility
  createFormData: {
    name: string;
    email: string;
    major: string;
  }; // Form state for the new entry
  handleCreateChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handles input changes
  submitCreate: () => void; // Called when Save is clicked
  setIsCreating: (val: boolean) => void; // Toggles modal visibility
  errorMessage: string; // Validation or server error message
  setErrorMessage: (val: string) => void; // Clears or sets error message
  setCreateFormData: (data: { name: string; email: string; major: string }) => void; // Resets form on close
}

/**
 * CreateModal shows a modal dialog for adding a new record (name, email, major).
 * It includes validation feedback, scroll lock, and fade-in animation.
 */
const CreateModal: React.FC<CreateModalProps> = ({
  isCreating,
  createFormData,
  handleCreateChange,
  submitCreate,
  setIsCreating,
  errorMessage,
  setErrorMessage,
  setCreateFormData,
}) => {
  // Prevents background scroll when the modal is open
  useEffect(() => {
    if (isCreating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup scroll on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreating]);

  // Do not render anything if the modal is closed
  if (!isCreating) return null;

  return (
    // Modal overlay (dark background)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96 space-y-4 animate-fade-in">
        {/* Modal title */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
          Add New Register
        </h2>

        {/* Error message display */}
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
          value={createFormData.name}
          onChange={handleCreateChange}
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Name"
        />

        {/* Input: Email */}
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={createFormData.email}
          onChange={handleCreateChange}
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Email"
        />

        {/* Input: Major */}
        <input
          type="text"
          name="major"
          autoComplete="off"
          value={createFormData.major}
          onChange={handleCreateChange}
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Major"
        />

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-4">
          {/* Cancel: closes modal and clears form/errors */}
          <button
            onClick={() => {
              setIsCreating(false);
              setErrorMessage("");
              setCreateFormData({ name: "", email: "", major: "" });
            }}
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>

          {/* Save: triggers form submission */}
          <button
            onClick={submitCreate}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-400 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;