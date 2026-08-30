import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await login(email.trim(), password);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] px-6 py-10 sm:py-16 flex items-center justify-center">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[#ded5c7] bg-[#fffdf9] shadow-[0_25px_70px_rgba(32,32,32,0.10)]">

        <div className="grid md:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}

          <div className="relative hidden overflow-hidden bg-[#202020] p-12 text-[#f6f1e8] md:flex md:min-h-[650px] md:flex-col md:justify-between">

            {/* Decorative circles */}

            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#b85c38]/25 blur-3xl" />

            <div className="absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-[#e7a07c]/10 blur-3xl" />

            {/* Logo */}

            <div className="relative">

              <Link
                to="/"
                className="group flex items-center gap-3"
              >

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b85c38] font-serif text-xl font-bold text-white transition group-hover:rotate-6">
                  I
                </span>

                <span className="font-serif text-2xl font-bold tracking-tight">
                  InkNest
                </span>

              </Link>

            </div>


            {/* Main message */}

            <div className="relative">

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#e7a07c]">
                Welcome back
              </p>

              <h2 className="font-serif text-5xl font-semibold leading-[1.08]">
                Your next story
                <br />
                starts here.
              </h2>

              <p className="mt-6 max-w-sm text-[16px] leading-7 text-[#c8c0b6]">
                Return to your space for ideas, experiences and stories worth
                sharing.
              </p>

            </div>


            {/* Bottom */}

            <p className="relative text-sm text-[#817970]">
              Write freely. Share thoughtfully.
            </p>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="p-8 sm:p-12 lg:p-14">

            {/* Mobile logo */}

            <div className="mb-10 flex items-center justify-center gap-3 md:hidden">

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b85c38] font-serif text-lg font-bold text-white">
                I
              </span>

              <span className="font-serif text-2xl font-bold text-[#202020]">
                InkNest
              </span>

            </div>


            <div className="mx-auto max-w-md">

              {/* Heading */}

              <div className="mb-9">

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b85c38]">
                  Sign in
                </p>

                <h1 className="font-serif text-4xl font-bold leading-tight text-[#202020] sm:text-5xl">
                  Welcome back.
                </h1>

                <p className="mt-3 leading-7 text-[#6b6259]">
                  Sign in to continue your writing journey.
                </p>

              </div>


              {/* Error */}

              {error && (
                <div className="mb-6 rounded-xl border border-[#e9b9a8] bg-[#fff1ed] px-4 py-3 text-sm leading-6 text-[#b54526]">
                  {error}
                </div>
              )}


              {/* Form */}

              <form onSubmit={handleSubmit}>

                {/* Email */}

                <div className="mb-5">

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#38322d]"
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
                    className="w-full rounded-xl border border-[#d8cfc1] bg-[#fffdf9] px-4 py-3.5 text-[#202020] outline-none transition placeholder:text-[#aaa096] focus:border-[#b85c38] focus:ring-4 focus:ring-[#b85c38]/10"
                  />

                </div>


                {/* Password */}

                <div className="mb-7">

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#38322d]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-[#d8cfc1] bg-[#fffdf9] px-4 py-3.5 text-[#202020] outline-none transition placeholder:text-[#aaa096] focus:border-[#b85c38] focus:ring-4 focus:ring-[#b85c38]/10"
                  />

                </div>


                {/* Sign in button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#b85c38] py-3.5 font-bold text-white shadow-sm transition hover:bg-[#984728] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in →"}
                </button>

              </form>


              {/* Divider */}

              <div className="my-8 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#ded5c7]" />

                <span className="text-xs font-medium uppercase tracking-widest text-[#9a9085]">
                  New here?
                </span>

                <div className="h-px flex-1 bg-[#ded5c7]" />

              </div>


              {/* Register */}

              <Link
                to="/register"
                className="block w-full rounded-xl border border-[#cfc5b7] py-3.5 text-center font-semibold text-[#38322d] transition hover:border-[#b85c38] hover:bg-[#fff8f3] hover:text-[#b85c38]"
              >
                Create an InkNest account
              </Link>


              {/* Back */}

              <Link
                to="/"
                className="mt-6 block text-center text-sm text-[#746b62] transition hover:text-[#b85c38]"
              >
                ← Back to home
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;