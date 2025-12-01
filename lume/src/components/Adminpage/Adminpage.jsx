import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Adminpage.css";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

const Adminpage = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("adminToken");
    if (!token) {
        return <h2 className="not-auth">Not Authorized</h2>;
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}posts/`);
            setBlogs(response.data);
        } catch (err) {
            console.error("Error fetching posts", err);
        }
    };

    const handleDelete = async (slug) => {
        if (!window.confirm("Delete this blog?")) return;

        try {
            await axios.delete(`${API_BASE_URL}posts/${slug}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchBlogs();
        } catch (err) {
            alert("Delete failed");
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
    };

    return (
    <div className="admin-page-wrapper">

        {/* Header */}
        <div className="admin-header">
            <h1>Dashboard</h1>

            <div className="admin-header-actions">

                {/* Add Blog */}
                <button className="minimal-icon" onClick={() => navigate("/add-blog")}>
                    ➕
                </button>

                {/* Logout */}
                <button className="minimal-icon" onClick={handleLogout}>
                    🚪
                </button>

            </div>
        </div>

        {/* Blog List */}
        <div className="blog-list">
            {blogs.map((blog) => (
                <div key={blog.slug} className="blog-card">

                    <h2 className="blog-title">{blog.title}</h2>

                    <div className="blog-actions">

                        {/* Edit */}
                        <Link to={`/edit-blog/${blog.slug}`} className="minimal-icon">
                            ✏️
                        </Link>

                        {/* Delete */}
                        <button
                            className="minimal-icon"
                            onClick={() => handleDelete(blog.slug)}
                        >
                            🗑️
                        </button>

                    </div>

                </div>
            ))}
        </div>

    </div>
);

};

export default Adminpage;
