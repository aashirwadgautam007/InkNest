import Blog from "../models/Blog.js";

// ===============================
// Create Blog
// ===============================
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
    });

    const populatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name email"
    );

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating blog",
    });
  }
};

// ===============================
// Get All Blogs
// ===============================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get all blogs error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching blogs",
    });
  }
};

// ===============================
// Get My Blogs
// ===============================
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get my blogs error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching blog",
    });
  }
};

// ===============================
// Get Blog By ID
// ===============================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get blog by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching blog",
    });
  }
};

// ===============================
// Update Blog
// ===============================
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check whether logged-in user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name email"
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating blog",
    });
  }
};

// ===============================
// Delete Blog
// ===============================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check whether logged-in user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting blog",
    });
  }
};