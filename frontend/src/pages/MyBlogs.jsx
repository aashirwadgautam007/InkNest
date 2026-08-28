import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/blogs/my-blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("My blogs error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  // =========================
  // Delete Blog
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted blog from screen
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== id)
      );

    } catch (error) {
      console.error("Delete blog error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete blog."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading your blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            My Blogs
          </h1>

          <Link
            to="/create-blog"
            className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
          >
            + Create Blog
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* No Blogs */}
        {blogs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">

            <p className="text-gray-600 mb-4">
              You haven't created any blogs yet.
            </p>

            <Link
              to="/create-blog"
              className="text-blue-600 hover:underline"
            >
              Create your first blog
            </Link>

          </div>
        ) : (

          <div className="grid gap-6">

            {blogs.map((blog) => (

              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-6"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {blog.content.length > 200
                    ? blog.content.substring(0, 200) + "..."
                    : blog.content}
                </p>

                <div className="text-sm text-gray-500 mb-5">
                  Created:{" "}
                  {new Date(
                    blog.createdAt
                  ).toLocaleDateString()}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Read More
                  </Link>

                  <button
                    onClick={() =>
                      navigate(`/edit-blog/${blog._id}`)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default MyBlogs;