"use client";

import React from "react";
import Swal from "sweetalert2";

/**
 * Props for the DeleteConfirmModal component
 */
interface DeleteConfirmModalProps {
  isOpen: boolean;          // Whether the modal is currently visible
  onClose: () => void;      // Function to close the modal
  onConfirm: () => void;    // Function to perform deletion after confirmation
}

/**
 * DeleteConfirmModal component displays a confirmation dialog asking the user
 * if they are sure about deleting an item. Once confirmed, it closes the modal,
 * shows a draggable SweetAlert2 success popup, and then triggers the deletion logic.
 */
export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  
  // Do not render anything if the modal is not open
  if (!isOpen) return null;

  /**
   * Handles the deletion confirmation process:
   * 1. Closes the modal.
   * 2. Shows a SweetAlert2 success popup.
   * 3. Executes the deletion callback.
   */
  const handleDelete = async () => {
    onClose(); // Close the modal first

    // Show SweetAlert2 success message
    await Swal.fire({
      title: "User deleted!",
      text: "The user has been successfully deleted.",
      icon: "success",
      background: "#f1f1f1", // light bone white
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      backdrop: true,
      didOpen: () => {
        // Customize popup styles
        const popup = Swal.getPopup();
        if (popup) {
          popup.setAttribute("draggable", "true");
          popup.style.cursor = "move";
          popup.style.borderRadius = "16px";
        }
      },
    });

    await onConfirm(); // Final delete action (e.g., refresh table)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 transition-all duration-300 ease-in-out">
          
          {/* Close button (top-right X icon) */}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 absolute top-2.5 right-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 p-1.5 rounded-lg
            cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            {/* Close (X) icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 
                   0 111.414 1.414L11.414 10l4.293 4.293a1 1 
                   0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 
                   0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 
                   0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Confirmation content */}
          <>
            {/* Trash can icon */}
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 
                   0 000 2v10a2 2 0 002 2h8a2 2 
                   0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 
                   0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 
                   0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 
                   0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>

            {/* Confirmation message */}
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this item?
            </p>

            {/* Action buttons */}
            <div className="flex justify-center items-center space-x-4">
              {/* Cancel button */}
              <button
                onClick={onClose}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border 
                border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 
                focus:ring-primary-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 cursor-pointer"
              >
                No, cancel
              </button>

              {/* Confirm deletion button */}
              <button
                onClick={handleDelete}
                type="button"
                className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg 
                hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 
                dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 cursor-pointer"
              >
                Yes, I am sure
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
