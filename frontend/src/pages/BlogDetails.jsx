import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/blogs/${id}`);

        setBlog(response.data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load this story."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f1e8] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#b85c38] text-white font-serif text-xl">
            I
          </div>

          <div className="mx-auto mb-4 h-1 w-20 overflow-hidden rounded-full bg-[#eadfd5]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#b85c38]" />
          </div>

          <p className="text-[#766b63]">
            Opening your story...
          </p>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#f6f1e8] flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-[#e3d9cc] bg-[#fffdf9] p-10 text-center shadow-[0_18px_50px_rgba(40,30,20,0.07)]">

          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2dfd5] font-serif text-2xl font-bold text-[#b85c38]">
            I
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#202020]">
            Story unavailable
          </h1>

          <p className="mt-3 leading-7 text-[#766b63]">
            {error || "Story not found."}
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center rounded-xl bg-[#b85c38] px-6 py-3 font-semibold text-white transition hover:bg-[#984728]"
          >
            ← Back to stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#202020]">

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">

        {/* Back navigation */}

        <div className="mb-10 flex items-center justify-between">

          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-[#a94d2a] transition hover:text-[#7f371f]"
          >
            ← Back to stories
          </Link>

          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-[#a08f82] sm:block">
            InkNest Journal
          </span>

        </div>


        {/* ================= ARTICLE ================= */}

        <article className="overflow-hidden rounded-3xl border border-[#e3d9cc] bg-[#fffdf9] shadow-[0_20px_60px_rgba(40,30,20,0.08)]">

          {/* Top accent */}

          <div className="h-2 bg-[#b85c38]" />


          <div className="px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">

            {/* Story label */}

            <div className="mb-7 flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b85c38] font-serif text-xl font-bold text-white">
                I
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b45531]">
                InkNest Story
              </span>

            </div>


            {/* Title */}

            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>


            {/* Author / date */}

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#e5ddd3] pb-8 text-sm text-[#766d64]">

              <span>
                Written by{" "}
                <span className="font-semibold text-[#984728]">
                  {blog.author?.name ||
                    blog.author ||
                    "Unknown author"}
                </span>
              </span>

              <span className="hidden sm:inline text-[#c1b6ac]">
                •
              </span>

              <span>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : blog.date || "Recently"}
              </span>

            </div>


            {/* ================= STORY CONTENT ================= */}

            <div className="mt-12 max-w-3xl">

              {blog.content
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim())
                .map((paragraph, index) => (

                  <p
                    key={index}
                    className={`mb-7 text-lg leading-9 text-[#403a35] sm:text-xl sm:leading-10 ${
                      index === 0
                        ? "first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[#b85c38] first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8]"
                        : ""
                    }`}
                  >
                    {paragraph}
                  </p>

                ))}

            </div>


            {/* ================= ARTICLE FOOTER ================= */}

            <div className="mt-14 border-t border-[#e5ddd3] pt-8">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a08f82]">
                    End of story
                  </p>

                  <p className="mt-2 text-sm text-[#8a7d72]">
                    Thanks for taking the time to read.
                  </p>
                </div>


                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl bg-[#202020] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b85c38]"
                >
                  Read more stories →
                </Link>

              </div>

            </div>

          </div>

        </article>


        {/* ================= BOTTOM QUOTE ================= */}

        <div className="mt-10 text-center">

          <p className="font-serif text-xl italic text-[#85786e]">
            "Every story needs a place."
          </p>

        </div>

      </main>

    </div>
  );
}

export default BlogDetails;