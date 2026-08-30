import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch story
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to edit this story.");
          setLoading(false);
          return;
        }

        const response = await api.get(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const blog = response.data.blog;

        setTitle(blog.title || "");
        setContent(blog.content || "");
      } catch (error) {
        console.error("Fetch blog error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load this story."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Update story
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a story title.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter some story content.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await api.put(
        `/blogs/${id}`,
        {
          title: title.trim(),
          content: content.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error("Update error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update this story."
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c66338] font-serif text-2xl text-white">
            I
          </div>

          <p className="text-lg text-[#6b6258]">
            Loading your story...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#171717]">

      <main className="mx-auto max-w-4xl px-6 py-10 sm:py-12">

        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/my-blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#a94f2d] transition hover:text-[#7f3922]"
          >
            ← Back to my stories
          </Link>
        </div>

        {/* Editor */}
        <div className="overflow-hidden rounded-2xl border border-[#e3d9cc] bg-[#fffdf9] shadow-sm">

          {/* Accent */}
          <div className="h-1.5 bg-[#c66338]" />

          <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-12">

            {/* Header */}
            <div className="mb-9">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#b45531]">
                YOUR WRITING
              </p>

              <h1 className="font-serif text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
                Edit Story
              </h1>

              <p className="mt-3 text-base leading-7 text-[#766d64] sm:text-lg">
                Refine your story before sharing it with the world.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-7 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Title */}
              <div className="mb-7">

                <label
                  htmlFor="title"
                  className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#766d64]"
                >
                  Story Title
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story a title..."
                  className="w-full rounded-xl border border-[#d9cec1] bg-[#fffdf9] px-5 py-4 font-serif text-xl text-[#171717] outline-none transition placeholder:text-[#aaa098] focus:border-[#c66338] focus:ring-4 focus:ring-[#c66338]/10"
                />

              </div>

              {/* Content */}
              <div className="mb-8">

                <label
                  htmlFor="content"
                  className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#766d64]"
                >
                  Story Content
                </label>

                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your story..."
                  rows={18}
                  className="w-full resize-y rounded-xl border border-[#d9cec1] bg-[#fffdf9] px-5 py-4 text-lg leading-8 text-[#403a35] outline-none transition placeholder:text-[#aaa098] focus:border-[#c66338] focus:ring-4 focus:ring-[#c66338]/10"
                />

                <p className="mt-2 text-right text-xs text-[#9a9188]">
                  {content.length} characters
                </p>

              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#e5ddd3] pt-7 sm:flex-row">

                <button
                  type="button"
                  onClick={() => navigate(`/blogs/${id}`)}
                  className="rounded-xl border border-[#d9cec1] bg-[#fffdf9] px-7 py-3.5 font-semibold text-[#403a35] transition hover:bg-[#f5f1e8]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#c66338] px-7 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ad512d] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving Changes..." : "Save Changes →"}
                </button>

              </div>

            </form>

          </div>
        </div>

      </main>
    </div>
  );
}

export default EditBlog;