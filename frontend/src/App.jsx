import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">

          <Routes>

            {/* =========================
                Public Routes
            ========================== */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/blogs/:id"
              element={<BlogDetails />}
            />


            {/* =========================
                Protected Routes
            ========================== */}

            <Route
              path="/create-blog"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-blog/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-blogs"
              element={
                <ProtectedRoute>
                  <MyBlogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />


            {/* =========================
                404 Page
            ========================== */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;