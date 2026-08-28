import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please Login
          </h2>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-lg shadow-md p-8">

          <h1 className="text-3xl font-bold mb-8">
            My Profile
          </h1>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500 text-sm">
                Name
              </p>

              <p className="text-lg font-semibold">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <p className="text-lg font-semibold">
                {user.email}
              </p>
            </div>

          </div>

          <div className="mt-8 flex gap-4">

            <Link
              to="/my-blogs"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              My Blogs
            </Link>

            <Link
              to="/create-blog"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Create Blog
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;