import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register(
        name.trim(),
        email.trim(),
        password,
        confirmPassword
      );

      navigate("/");
    } catch (error) {
      console.error("Register error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] px-6 py-12 flex items-center justify-center">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-[#fffdf9] rounded-3xl overflow-hidden border border-[#ded5c7] shadow-[0_20px_60px_rgba(32,32,32,0.10)]">

        {/* LEFT PANEL */}
        <div className="hidden md:flex bg-[#202020] text-[#f6f1e8] p-12 flex-col justify-between relative overflow-hidden">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#b85c38]/30 blur-3xl" />

          <div className="relative">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b85c38] font-serif text-xl font-bold">
                I
              </span>

              <span className="font-serif text-2xl font-bold">
                InkNest
              </span>
            </Link>
          </div>

          <div className="relative">

            <p className="text-sm uppercase tracking-[0.25em] text-[#e7a07c] mb-5">
              Begin your journey
            </p>

            <h2 className="font-serif text-5xl leading-tight font-semibold">
              Every story
              <br />
              needs a place.
            </h2>

            <p className="mt-6 max-w-sm text-[#c8c0b6] leading-7">
              Create your space, share your thoughts and give your ideas a
              home at InkNest.
            </p>

          </div>

          <p className="relative text-sm text-[#817970]">
            Write freely. Share thoughtfully.
          </p>

        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 sm:p-12">

          {/* MOBILE LOGO */}
          <div className="flex items-center justify-center gap-3 mb-8 md:hidden">

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b85c38] font-serif text-lg font-bold text-white">
              I
            </span>

            <span className="font-serif text-2xl font-bold text-[#202020]">
              InkNest
            </span>

          </div>

          <div className="max-w-md mx-auto">

            {/* HEADER */}
            <div className="mb-7">

              <p className="text-sm uppercase tracking-[0.2em] text-[#b85c38] font-semibold mb-3">
                Create account
              </p>

              <h1 className="font-serif text-4xl font-semibold text-[#202020]">
                Start writing.
              </h1>

              <p className="mt-3 text-[#6b6259]">
                Join InkNest and give your ideas a place to live.
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-4">

                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#38322d] mb-2"
                >
                  Your name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#d8cfc1] bg-[#fffdf9] px-4 py-3 text-[#202020] outline-none transition focus:border-[#b85c38] focus:ring-4 focus:ring-[#b85c38]/10"
                />

              </div>

              {/* EMAIL */}
              <div className="mb-4">

                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#38322d] mb-2"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#d8cfc1] bg-[#fffdf9] px-4 py-3 text-[#202020] outline-none transition focus:border-[#b85c38] focus:ring-4 focus:ring-[#b85c38]/10"
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#38322d] mb-2"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-[#d8cfc1] bg-[#fffdf9] px-4 py-3 text-[#202020] outline-none transition focus:border-[#b85c38] focus:ring-4 focus:ring-[#b85c38]/10"
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-6">

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-[#38322d] mb-2"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-[#d8cfc1] bg-[#fffdf9] px-4 py-3 text-[#202020] outline-none transition focus:border-[#b85c38] focus:ring-4 focus:ring-[#b85c38]/10"
                />

              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#b85c38] py-3.5 font-bold text-white transition hover:bg-[#984728] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating your account..."
                  : "Create account →"}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#ded5c7]" />

              <span className="text-xs uppercase tracking-widest text-[#9a9085]">
                Already a writer?
              </span>

              <div className="h-px flex-1 bg-[#ded5c7]" />

            </div>

            {/* LOGIN */}
            <Link
              to="/login"
              className="block w-full rounded-xl border border-[#cfc5b7] py-3.5 text-center font-semibold text-[#38322d] transition hover:border-[#b85c38] hover:text-[#b85c38]"
            >
              Sign in to InkNest
            </Link>

            {/* HOME */}
            <Link
              to="/"
              className="mt-5 block text-center text-sm text-[#746b62] hover:text-[#b85c38]"
            >
              ← Back to home
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;