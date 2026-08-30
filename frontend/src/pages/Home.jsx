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
      setLoading(true);
      setError("");

      const response = await api.get("/blogs");

      setBlogs(response.data.blogs || []);
    } catch (err) {
      console.error("Fetch blogs error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load stories right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#202020]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#202020] text-white">

        {/* Decorative shapes */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#b85c38]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#c97852]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">

          <div className="max-w-3xl">

            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#d77b58]" />

              <span className="text-sm font-medium text-[#ddd5cc]">
                A home for thoughtful writing
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Stories begin
              <span className="block text-[#e7a07c]">
                with an idea.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#c9c2ba] sm:text-xl">
              A quiet corner of the internet for ideas,
              experiences and stories worth remembering.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">

              {user ? (
                <Link
                  to="/create-blog"
                  className="rounded-xl bg-[#fffdf9] px-6 py-3.5 font-semibold text-[#202020] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#f2dfd5]"
                >
                  Write a Story →
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="rounded-xl bg-[#fffdf9] px-6 py-3.5 font-semibold text-[#202020] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#f2dfd5]"
                >
                  Start Writing →
                </Link>
              )}

              <a
                href="#stories"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition duration-200 hover:bg-white/10"
              >
                Read the Journal
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* ================= STORIES ================= */}
      <section
        id="stories"
        className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
      >

        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b85c38]">
              Discover
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#202020] sm:text-5xl">
              Recent Stories
            </h2>

            <p className="mt-3 max-w-xl text-[#6b6259]">
              Ideas and experiences from the InkNest community.
            </p>

          </div>

          {user && (
            <Link
              to="/my-blogs"
              className="font-semibold text-[#b85c38] transition hover:text-[#984728]"
            >
              View my stories →
            </Link>
          )}

        </div>


        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-8 rounded-2xl border border-[#e8c7bd] bg-[#fff8f5] px-6 py-5">

            <p className="font-medium text-[#b54526]">
              {error}
            </p>

            <button
              onClick={fetchBlogs}
              className="mt-3 text-sm font-semibold text-[#a94d2a] hover:underline"
            >
              Try again →
            </button>

          </div>
        )}


        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="rounded-2xl border border-[#e3d9cc] bg-[#fffdf9] py-24 text-center">

            <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border-4 border-[#eadfd5] border-t-[#b85c38]" />

            <p className="text-[#766b63]">
              Loading stories...
            </p>

          </div>
        ) : blogs.length === 0 ? (

          /* ================= EMPTY ================= */
          <div className="rounded-2xl border border-dashed border-[#d8cdc1] bg-[#fffdf9] px-6 py-20 text-center">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2dfd5] font-serif text-3xl text-[#b85c38]">
              I
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#202020]">
              No stories yet
            </h3>

            <p className="mx-auto mt-3 max-w-md leading-7 text-[#6b6259]">
              The journal is waiting for its first story.
              Put an idea into words and give it a place to live.
            </p>

            {user && (
              <Link
                to="/create-blog"
                className="mt-7 inline-block rounded-xl bg-[#b85c38] px-6 py-3 font-semibold text-white transition hover:bg-[#984728]"
              >
                Publish the First Story
              </Link>
            )}

          </div>

        ) : (

          /* ================= STORY GRID ================= */
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {blogs.map((blog) => (

              <article
                key={blog._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e3d9cc] bg-[#fffdf9] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(40,30,20,0.10)]"
              >

                {/* Accent */}
                <div className="h-1.5 bg-[#b85c38]" />

                <div className="flex flex-1 flex-col p-7">

                  {/* Meta */}
                  <div className="mb-5 flex items-center justify-between gap-3">

                    <span className="text-xs font-medium text-[#9a9086]">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>

                    <span className="rounded-full bg-[#f2dfd5] px-3 py-1 text-xs font-medium text-[#a94d2a]">
                      Story
                    </span>

                  </div>


                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold leading-tight text-[#202020] transition duration-200 group-hover:text-[#b85c38]">
                    {blog.title}
                  </h3>


                  {/* Preview */}
                  <p className="mt-4 line-clamp-4 flex-1 text-[15px] leading-7 text-[#6b6259]">
                    {blog.content}
                  </p>


                  {/* Footer */}
                  <div className="mt-7 border-t border-[#eee7df] pt-5">

                    <p className="text-sm text-[#766b63]">

                      Written by{" "}

                      <span className="font-semibold text-[#984728]">
                        {blog.author?.name || "Unknown author"}
                      </span>

                    </p>

                    <Link
                      to={`/blogs/${blog._id}`}
                      className="mt-4 block rounded-xl bg-[#202020] py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-[#b85c38]"
                    >
                      Read Story →
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">

        <div className="relative overflow-hidden rounded-3xl bg-[#b85c38] px-8 py-12 text-center text-white sm:px-12 sm:py-14">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Your turn
            </p>

            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Have something to say?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
              Turn your next idea into a story and share it
              with people who want to read it.
            </p>

            {user && (
              <Link
                to="/create-blog"
                className="mt-7 inline-block rounded-xl bg-white px-6 py-3.5 font-semibold text-[#984728] transition hover:-translate-y-0.5 hover:bg-[#f8eee8]"
              >
                Start Writing →
              </Link>
            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;