import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-bold mb-3">
        {blog.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {blog.content.length > 150
          ? blog.content.substring(0, 150) + "..."
          : blog.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <p>
            By: {blog.author?.name || "Unknown"}
          </p>

          <p>
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Link
          to={`/blogs/${blog._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;