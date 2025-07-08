// Enable client-side rendering for this component
"use client";

import { useEffect, useState } from "react";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import EditModal from "./components/UpdateModal";
import CreateModal from "./components/CreateModal";
import { Pagination } from "./components/Pagination";
import { useStars } from "./hooks/useStars";
import { TiDelete } from "react-icons/ti";

/**
 * HomePage component - Renders a full CRUD interface for managing "Hollywood stars".
 * It includes create, read, update, and delete functionality using modals.
 */
export default function HomePage() {
  const [updateStatus, setUpdateStatus] = useState<"success" | "error" | "">(
    ""
  );

  // Controls fade-in animation for main content
  const [fadeIn, setFadeIn] = useState(false);

  // Stores search input value to filter stars
  const [searchTerm, setSearchTerm] = useState("");

  // Controls visibility of delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Stores ID of the star selected for deletion
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Custom hook managing all CRUD logic and shared state
  const {
    fetchStars,
    totalPages, // Total number of pages for pagination
    stars, // Array of all fetched stars
    isCreating, // Boolean: controls visibility of the create modal
    isEditing, // Boolean: controls visibility of the edit modal
    formData, // Form data for editing a star
    createFormData, // Form data for creating a new star
    errorMessage, // Error messages for form validation
    setIsCreating, // Setter for create modal state
    loading, // Boolean: loading state for data fetch
    setIsEditing, // Setter for edit modal state
    setSearchTerm: setSearch, // Setter for search term (renamed for clarity)
    setCreateFormData, // Setter for create form data
    setErrorMessage, // Setter for error message
    handleCreateChange, // Input handler for create form
    handleEditChange, // Input handler for edit form
    handleUpdate, // Opens edit modal with selected star
    handleDelete, // Deletes a star
    submitCreate, // Submits new star to API
    submitUpdate, // Submits edited star to API
  } = useStars(currentPage, 6);

  // When loading state changes, update fade-in animation
  useEffect(() => {
    setFadeIn(!loading);
  }, [loading]);

  // Handles search form submission and updates search term in state
  const onSearch = (event) => {
    event.preventDefault();
    setSearch(searchTerm);
  };

  return (
    <main className="min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        javascript&apos;s Crud
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div
          role="status"
          className="flex flex-col justify-center items-center h-64 gap-4 animate-fadeIn"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-dashed animate-spinCustom shadow-blue-500 shadow-lg" />
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full animate-pulse border border-blue-400" />
          </div>
        </div>
      ) : (
        // Main content (table and modals)
        <div
          className={`mx-auto w-full min-h-[590px] max-w-6xl overflow-x-auto rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 shadow-2xl transform transition-all duration-700 ease-out ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Header: Search + Add Button */}
          <div className="flex justify-end mb-4">
            <div className="flex justify-between items-center mr-6">
              <form onSubmit={onSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-1.5 pr-8 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white mb-2"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm(""); // Clean the input
                      setCurrentPage(1); // Come back to the first page
                      setSearch(""); // This force refresh on useStars
                    }}
                    className="absolute right-2 top-3 text-gray-500 
                    transition-all duration-300 ease-out cursor-pointer text-base"
                    aria-label="Clear search input"
                  >
                    <TiDelete />
                  </button>
                )}
              </form>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
            >
              + Add
            </button>
          </div>

          {/* Stars Table */}
          <table className="min-w-full text-sm text-left text-gray-300 transition-all duration-700 ease-in-out">
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
                    {/* Edit Button */}
                    <button
                      onClick={() => handleUpdate(star)}
                      className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-400 hover:text-black active:scale-95 cursor-pointer"
                    >
                      ✏ Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setSelectedId(star._id);
                        setShowDeleteModal(true);
                      }}
                      className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-400 hover:text-black active:scale-95 cursor-pointer"
                    >
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          {/* Modals */}
          <EditModal
            isEditing={isEditing}
            formData={formData}
            handleEditChange={handleEditChange}
            submitUpdate={submitUpdate}
            setIsEditing={setIsEditing}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          <CreateModal
            isCreating={isCreating}
            createFormData={createFormData}
            handleCreateChange={handleCreateChange}
            submitCreate={submitCreate}
            setIsCreating={setIsCreating}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setCreateFormData={setCreateFormData}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await handleDelete(selectedId);
          setShowDeleteModal(false);
        }}
      />
    </main>
  );
}
