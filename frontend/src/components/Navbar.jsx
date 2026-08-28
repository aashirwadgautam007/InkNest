import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 py-4">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold"
          >
            BlogApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">

            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/create-blog"
                  className="hover:text-gray-300"
                >
                  Create Blog
                </Link>

                <Link
                  to="/my-blogs"
                  className="hover:text-gray-300"
                >
                  My Blogs
                </Link>

                <Link
                  to="/profile"
                  className="hover:text-gray-300"
                >
                  Profile
                </Link>

                <span className="text-gray-300">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>


        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-700 pt-4">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/create-blog"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Create Blog
                  </Link>

                  <Link
                    to="/my-blogs"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    My Blogs
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Profile
                  </Link>

                  <span className="text-gray-300">
                    Hi, {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;