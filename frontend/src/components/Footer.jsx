function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              InkNest
            </h2>

            <p className="text-gray-400">
              A simple platform to share your thoughts,
              ideas and stories with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">

              <a
                href="/"
                className="text-gray-400 hover:text-white"
              >
                Home
              </a>

              <a
                href="/create-blog"
                className="text-gray-400 hover:text-white"
              >
                Create Blog
              </a>

              <a
                href="/my-blogs"
                className="text-gray-400 hover:text-white"
              >
                My Blogs
              </a>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              InkNest
            </h3>

            <p className="text-gray-400">
              Write. Share. Inspire.
            </p>

            <p className="text-gray-400 mt-2">
              Built with React, Node.js and MongoDB.
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} InkNest.
            All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;