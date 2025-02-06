const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const submitProject = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to submit project");

    return await response.json();
  } catch (error) {
    console.error("Error submitting project:", error);
    throw error;
  }
};
