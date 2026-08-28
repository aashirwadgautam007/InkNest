import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch blog
  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blog = response.data.blog;

      setTitle(blog.title);
      setContent(blog.content);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load blog."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await api.put(
        `/blogs/${id}`,
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

      alert("Blog updated successfully!");

      navigate(`/blogs/${id}`);

    } catch (error) {
      console.error("Update error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update blog."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-lg shadow-md p-8">

          <h1 className="text-3xl font-bold mb-6">
            Edit Blog
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
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-300 rounded p-3"
              />

            </div>

            {/* Content */}
            <div className="mb-6">

              <label className="block font-medium mb-2">
                Blog Content
              </label>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                rows="12"
                className="w-full border border-gray-300 rounded p-3 resize-none"
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving
                  ? "Updating..."
                  : "Update Blog"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/my-blogs")
                }
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

export default EditBlog;