import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CreateBlog() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter a title and your story.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to publish story.");
      }

      navigate("/");
    } catch (err) {
      console.error("Create blog error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#171717]">

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Top row */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate("/my-blogs")}
            className="text-sm font-medium text-[#6f6258] hover:text-[#c45c32] transition"
          >
            ← Back to stories
          </button>
        </div>

        {/* Intro */}
        <div className="mb-10">
          <p className="text-[#c45c32] tracking-[0.3em] text-sm font-medium uppercase mb-4">
            Your space
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-4">
            Write something
            <br />
            worth remembering.
          </h1>

          <p className="text-lg text-[#766b63] max-w-2xl">
            Put your thoughts into words and give your ideas a place to live.
          </p>
        </div>

        {/* Editor */}
        <div className="bg-[#fffdf9] border border-[#ddd3c6] rounded-2xl shadow-[0_15px_45px_rgba(40,30,20,0.08)] overflow-hidden">

          {/* Editor top bar */}
          <div className="px-8 py-5 border-b border-[#e5ddd3] flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#a08f82]">
                New story
              </p>

              <p className="text-sm text-[#766b63] mt-1">
                {user?.name ? `Writing as ${user.name}` : "Start writing"}
              </p>
            </div>

            <span className="text-sm text-[#a08f82]">
              Draft
            </span>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Error */}
            {error && (
              <div className="mx-8 mt-6 bg-[#fff1ed] border border-[#e9b9a8] text-[#b54526] px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="px-8 pt-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a title..."
                className="w-full bg-transparent border-0 outline-none font-serif text-4xl md:text-5xl font-bold placeholder:text-[#b7ada4] text-[#171717]"
              />
            </div>

            {/* Divider */}
            <div className="mx-8 mt-6 border-t border-[#eee7df]" />

            {/* Content */}
            <div className="px-8 py-8">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Begin your story here..."
                className="w-full min-h-[420px] bg-transparent border-0 outline-none resize-none text-lg leading-8 text-[#403a35] placeholder:text-[#b7ada4]"
              />
            </div>

            {/* Bottom bar */}
            <div className="px-8 py-5 border-t border-[#e5ddd3] bg-[#faf7f2] flex flex-col sm:flex-row items-center justify-between gap-4">

              <p className="text-sm text-[#95877c]">
                {content.length} characters
              </p>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => navigate("/my-blogs")}
                  className="px-6 py-3 rounded-lg border border-[#d5c9bc] text-[#514940] font-medium hover:bg-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 rounded-lg bg-[#a94d2a] text-white font-semibold hover:bg-[#923f21] transition disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish story →"}
                </button>

              </div>
            </div>

          </form>
        </div>

        {/* Bottom quote */}
        <div className="mt-10 text-center">
          <p className="font-serif italic text-xl text-[#85786e]">
            "Every story needs a place."
          </p>
        </div>

      </main>
    </div>
  );
}

export default CreateBlog;