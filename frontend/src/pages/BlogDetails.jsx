import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlog(response.data.blog);
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

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <p className="bg-red-100 text-red-600 p-4 rounded">
          {error}
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">

        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Blogs
        </Link>

        <article className="bg-white rounded-lg shadow-md p-8 mt-6">

          <h1 className="text-4xl font-bold mb-4">
            {blog.title}
          </h1>

          <div className="text-gray-500 mb-8">
            <p>
              Author: {blog.author?.name || "Unknown"}
            </p>

            <p>
              Published:{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-gray-700 text-lg leading-8 whitespace-pre-wrap">
            {blog.content}
          </div>

        </article>

      </div>
    </div>
  );
}

export default BlogDetails;