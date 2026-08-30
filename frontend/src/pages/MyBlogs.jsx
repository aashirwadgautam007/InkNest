import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your stories.");
        return;
      }

      const response = await api.get("/blogs/my-blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs || []);
    } catch (err) {
      console.error("Fetch my blogs error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your stories right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog._id !== id)
      );
    } catch (err) {
      console.error("Delete blog error:", err);

      window.alert(
        err.response?.data?.message ||
          "Unable to delete this story."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#202020]">

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">

        {/* ================= PAGE HEADER ================= */}

        <div className="mb-12">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b85c38]">
                Your writing
              </p>

              <h1 className="mt-3 font-serif text-5xl font-bold leading-tight tracking-tight text-[#171717] sm:text-6xl">
                My Stories
              </h1>

              <p className="mt-4 max-w-xl text-lg text-[#766b63]">
                Your collection of thoughts, ideas and stories.
              </p>
            </div>

            <Link
              to="/create-blog"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-[#b85c38] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#984728]"
            >
              + Write a Story
            </Link>

          </div>

          <div className="mt-8 border-b border-[#ddd3c6]" />

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-8 rounded-2xl border border-[#e9b9a8] bg-[#fff1ed] px-6 py-5">

            <p className="font-medium text-[#b54526]">
              {error}
            </p>

            <button
              onClick={fetchMyBlogs}
              className="mt-3 text-sm font-semibold text-[#984728] underline underline-offset-4 hover:text-[#7f371f]"
            >
              Try again
            </button>

          </div>
        )}


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="rounded-2xl border border-[#e3d9cc] bg-[#fffdf9] py-24 text-center shadow-sm">

            <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border-4 border-[#eadfd5] border-t-[#b85c38]" />

            <p className="text-[#766b63]">
              Loading your stories...
            </p>

          </div>
        )}


        {/* ================= EMPTY ================= */}

        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d8cdc1] bg-[#fffdf9] px-6 py-24 text-center">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2dfd5] font-serif text-3xl text-[#b85c38]">
              I
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#202020]">
              No stories yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-[#766b63]">
              Your first story is waiting to be written.
              Put your thoughts into words and give them a place to live.
            </p>

            <Link
              to="/create-blog"
              className="mt-7 inline-flex rounded-xl bg-[#b85c38] px-6 py-3 font-semibold text-white transition hover:bg-[#984728]"
            >
              Start Writing →
            </Link>

          </div>
        )}


        {/* ================= STORY GRID ================= */}

        {!loading && !error && blogs.length > 0 && (

          <>

            {/* Story count */}

            <div className="mb-6 flex items-center justify-between">

              <p className="text-sm text-[#8a7d72]">
                {blogs.length}{" "}
                {blogs.length === 1 ? "story" : "stories"}
              </p>

              <Link
                to="/"
                className="text-sm font-semibold text-[#a94d2a] transition hover:text-[#7f371f]"
              >
                Read the journal →
              </Link>

            </div>


            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {blogs.map((blog) => (

                <article
                  key={blog._id}
                  className="group flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-[#e3d9cc] bg-[#fffdf9] shadow-[0_5px_20px_rgba(40,30,20,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(40,30,20,0.10)]"
                >

                  {/* Top accent */}

                  <div className="h-1.5 bg-[#b85c38]" />


                  <div className="flex flex-1 flex-col p-7">

                    {/* Metadata */}

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs font-medium text-[#9a9086]">
                        {blog.createdAt
                          ? new Date(
                              blog.createdAt
                            ).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recently"}
                      </span>

                      <span className="rounded-full bg-[#f2dfd5] px-3 py-1 text-xs font-medium text-[#a94d2a]">
                        Published
                      </span>

                    </div>


                    {/* Title */}

                    <h2 className="mt-6 font-serif text-2xl font-bold leading-tight text-[#171717] transition group-hover:text-[#b85c38]">
                      {blog.title}
                    </h2>


                    {/* Content preview */}

                    <p className="mt-4 line-clamp-5 flex-1 text-[15px] leading-7 text-[#6b6259]">
                      {blog.content || "No content available."}
                    </p>


                    {/* Author */}

                    <p className="mt-5 text-sm text-[#8a7d72]">
                      Written by{" "}
                      <span className="font-semibold text-[#984728]">
                        {blog.author?.name || "You"}
                      </span>
                    </p>


                    {/* Actions */}

                    <div className="mt-6 border-t border-[#eee7df] pt-5">

                      <div className="grid grid-cols-[1fr_auto_auto] gap-2">

                        <Link
                          to={`/blogs/${blog._id}`}
                          className="rounded-xl bg-[#202020] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#b85c38]"
                        >
                          Read Story
                        </Link>

                        <Link
                          to={`/edit-blog/${blog._id}`}
                          className="rounded-xl border border-[#d8cdc1] px-4 py-3 text-sm font-semibold text-[#403a35] transition hover:bg-[#f6f1e8]"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(blog._id)}
                          className="rounded-xl border border-[#e8c7bd] px-4 py-3 text-sm font-semibold text-[#b54526] transition hover:bg-[#fff1ed]"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          </>
        )}

      </main>

    </div>
  );
}

export default MyBlogs;