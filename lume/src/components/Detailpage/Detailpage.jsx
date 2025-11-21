import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detailpage.css";
import { fetchBlogById } from "../../api/BlogApi";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Video from "../../tiptap/Video";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await fetchBlogById(id);
      setBlog(data);

      if (data.content_json) {
        const html = generateHTML(data.content_json, [
          StarterKit,
          Underline,
          Image,
          Video,
        ]);
        //  console.log(html);

        setHtmlContent(html);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="preload">Loading...</div>;
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


  return (
    <section className="blog-detail-section">
      <div className="blog-detail-container">
        

        <div className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta">
            <span>{blog.created_at}</span>
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

        <div className="blog-footer">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};


export default BlogDetail;

