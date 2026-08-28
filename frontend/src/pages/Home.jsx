import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Fetch blogs error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-5">
            Welcome to BlogApp
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Share your thoughts, ideas and stories with
            the world.
          </p>

          {user && (
            <Link
              to="/create-blog"
              className="inline-block bg-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Start Writing
            </Link>
          )}

        </div>

      </section>

      {/* Latest Blogs */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Latest Blogs
          </h2>

          {user && (
            <Link
              to="/my-blogs"
              className="text-blue-600 font-medium hover:underline"
            >
              View My Blogs →
            </Link>
          )}

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-16">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (

          <div className="bg-white rounded-lg shadow p-10 text-center">

            <h3 className="text-xl font-semibold mb-3">
              No blogs yet
            </h3>

            <p className="text-gray-500 mb-5">
              Be the first person to publish a blog!
            </p>

            {user && (
              <Link
                to="/create-blog"
                className="bg-blue-600 text-white px-5 py-3 rounded-lg"
              >
                Create First Blog
              </Link>
            )}

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {blogs.map((blog) => (

              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-5 line-clamp-4">
                    {blog.content}
                  </p>

                  <div className="border-t pt-4">

                    <p className="text-sm text-gray-500">
                      By:{" "}
                      <span className="font-medium text-gray-700">
                        {blog.author?.name || "Unknown"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(
                        blog.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="block text-center bg-blue-600 text-white mt-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Read More
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Home;