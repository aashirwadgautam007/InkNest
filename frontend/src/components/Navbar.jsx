import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-[#393939] bg-[#202020] text-[#f6f1e8]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b85c38] font-serif text-xl font-bold text-white transition group-hover:rotate-6">
            I
          </span>

          <span className="font-serif text-2xl font-bold tracking-tight">
            InkNest
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-5">

          <Link
            to="/"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#d8d1c7] transition hover:bg-white/5 hover:text-white sm:block"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/my-blogs"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#d8d1c7] transition hover:bg-white/5 hover:text-white sm:block"
              >
                My Stories
              </Link>

              <Link
                to="/create-blog"
                className="rounded-lg bg-[#b85c38] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#984728]"
              >
                Write
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-[#4a4a4a] px-4 py-2.5 text-sm font-medium text-[#ddd5cb] transition hover:bg-white/5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#d8d1c7] transition hover:bg-white/5 hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#b85c38] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#984728]"
              >
                Join
              </Link>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Navbar;