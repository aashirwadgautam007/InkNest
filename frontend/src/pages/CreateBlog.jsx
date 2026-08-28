import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter title and content.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/blogs",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After creating blog, go to Home
      navigate("/");
    } catch (error) {
      console.error("Create blog error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-lg shadow-md p-8">

          <h1 className="text-3xl font-bold mb-6">
            Create New Blog
          </h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-5">
              <label className="block font-medium mb-2">
                Blog Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block font-medium mb-2">
                Blog Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog here..."
                rows="10"
                className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default CreateBlog;