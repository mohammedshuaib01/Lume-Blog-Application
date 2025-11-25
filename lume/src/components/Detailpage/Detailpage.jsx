import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detailpage.css";
import { fetchBlogById } from "../../api/BlogApi";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Video from "../../tiptap/Video";
import { deleteBlogBySlug } from "../../api/BlogApi";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await fetchBlogById(slug);
      setBlog(data);

      if (data.content_json) {
        const html = generateHTML(data.content_json, [
          StarterKit,
          Underline,
          Image,
          Video,
        ]);
        console.log(html);

        setHtmlContent(html);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <div className="preload" style={{ minHeight: "60vh" }}>Loading...</div>;
  }

  const backendURL = "http://localhost:8000/";

  const fixMediaPaths = (html) => {
    return html
      // Fix double-quote image & video src
      .replace(/src="\/media\//g, `src="${backendURL}media/`)
      .replace(/src="media\//g, `src="${backendURL}media/`)
      // Fix single-quote image & video src
      .replace(/src='\/media\//g, `src='${backendURL}media/`)
      .replace(/src='media\//g, `src='${backendURL}media/`)
      // Fix <source> tags inside videos
      .replace(/<source\s+src="\/media\//g, `<source src="${backendURL}media/`)
      .replace(/<source\s+src='\/media\//g, `<source src='${backendURL}media/`);
  };

  const formattedDate = new Date(blog.created_at).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;


    const result = await deleteBlogBySlug(slug);

    if (result !== null) {
      alert("Blog deleted successfully!");
      window.location.href = "/";
    } else {
      alert("Failed to delete blog.");
    }
  };


  return (
    <section className="blog-detail-section">
      <div className="blog-detail-container">


        <div className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta">

            <span>{blog.formattedDate}</span>
          </div>
        </div>

        <div className="blog-image-wrapper">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="blog-detail-image"
          />
        </div>

        {/* Render HTML from Tiptap JSON */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: fixMediaPaths(htmlContent),
          }}
        ></div>

        <div className="button-div">
          <div className="blog-footer">
            <Link to="/" className="back-button">
              ← Back to Home
            </Link>
          </div>

          <div className="button-inner-div">
           

            <div className="blog-footer">
              <Link onClick={handleDelete} className="delete-button">
                Delete
              </Link>
            </div>

             <div className="blog-footer">
              <Link to={`/edit-blog/${slug}`} className="edit-button">
                Edit
              </Link>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};


export default BlogDetail;

