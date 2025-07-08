import { useEffect, useState } from "react";

/**
 * Custom React hook for managing CRUD operations and form state
 * for a list of Hollywood stars.
 * 
 * Includes:
 * - Pagination
 * - Search
 * - Form validation
 * - Modal management (edit/create)
 */
export function useStars(page = 1, limit = 2) {
  // List of stars fetched from the backend
  const [stars, setStars] = useState([]);

  // Whether data is loading
  const [loading, setLoading] = useState(false);

  // Total pages for pagination
  const [totalPages, setTotalPages] = useState(1);

  // The star currently selected for editing
  const [currentStar, setCurrentStar] = useState<any>(null);

  // Form data for editing a star
  const [formData, setFormData] = useState({ name: "", email: "", major: "" });

  // Form data for creating a new star
  const [createFormData, setCreateFormData] = useState({
    name: "",
    email: "",
    major: "",
  });

  // Form error message (used during validation)
  const [errorMessage, setErrorMessage] = useState("");

  // Controls whether the edit modal is shown
  const [isEditing, setIsEditing] = useState(false);

  // Controls whether the create modal is shown
  const [isCreating, setIsCreating] = useState(false);

  // Search term used for filtering stars
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Validates form data before creating or updating.
   */
  const validateForm = (data: typeof formData) => {
    const { name, email, major } = data;

    if (!name || !email || !major) {
      setErrorMessage("⚠️ All fields are required.");
      return false;
    }

    if (!email.includes("@")) {
      setErrorMessage("📧 Please enter a valid email address.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  /**
   * Prepares modal and form data for editing a selected star.
   */
  const handleUpdate = (star: any) => {
    setCurrentStar(star);
    setFormData({ name: star.name, email: star.email, major: star.major });
    setIsEditing(true);
  };

  /**
   * Handles input change for the edit form.
   */
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Submits updated star data to the backend.
   */
  const submitUpdate = async () => {
    if (!validateForm(formData)) return;
    try {
      const response = await fetch(
        `http://localhost:3001/hollywoodStars/${currentStar._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setCurrentStar(null);
        fetchStars(); // Reload updated data
      } else {
        console.error("Failed to update the star.");
      }
    } catch (error) {
      console.error("Error during update request:", error);
    }
  };

  /**
   * Handles input change for the create form.
   */
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submits new star data to the backend.
   */
  const submitCreate = async () => {
    if (!validateForm(createFormData)) return;
    try {
      const res = await fetch("http://localhost:3001/hollywoodStars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createFormData),
      });

      if (res.ok) {
        setIsCreating(false);
        setCreateFormData({ name: "", email: "", major: "" });
        fetchStars(); // Reload data
      } else {
        console.error("Error creating star");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Deletes a star by its ID.
   */
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/hollywoodStars/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStars((prev) => prev.filter((s) => s._id !== id));
      } else {
        console.error("Failed to delete the star.");
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };

  /**
   * Fetches paginated and filtered stars from the backend.
   */
  const fetchStars = async (customPage = page, customLimit = limit, customSearch = searchTerm) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/hollywoodStars?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setStars(data.data || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching stars:", error);
    }
  };

  // Refetch stars whenever the page, limit or search term changes
  useEffect(() => {
    fetchStars();
  }, [page, limit, searchTerm]);

  /**
   * Expose API to the consuming component.
   */
  return {
    totalPages,
    stars,
    currentStar,
    formData,
    createFormData,
    errorMessage,
    isEditing,
    isCreating,
    searchTerm,
    fetchStars,
    setSearchTerm,
    setIsEditing,
    setIsCreating,
    setFormData,
    setCreateFormData,
    setErrorMessage,
    handleUpdate,
    handleDelete,
    handleEditChange,
    handleCreateChange,
    submitUpdate,
    submitCreate,
    loading
  };
}
