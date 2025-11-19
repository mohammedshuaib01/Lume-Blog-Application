import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Detailpage.css'
import { fetchBlogById } from '../../api/BlogApi'

const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)



  useEffect(() => {
    const fetchBlog = async () => {
      const data = await fetchBlogById(id)
      console.log(data)
      setBlog(data)
    }
    fetchBlog()
  }, [id])

  if (!blog) {
    return <div>Loading...</div>
  }


  const backendURL = "http://localhost:8000/";
  // Fix CKEditor image src paths
  const fixImagePaths = (html) => {
    
     return html
    // Fix images
    .replace(/src="\/media\//g, `src="${backendURL}media/`)
    .replace(/src="media\//g, `src="${backendURL}media/`)
    
    // Fix video <source> tags
    .replace(/<source\s+src="\/media\//g, `<source src="${backendURL}media/`)
    .replace(/<source\s+src="media\//g, `<source src="${backendURL}media/`)
    
    // Fix video tag if CKEditor outputs <video src="...">
    .replace(/<video\s+[^>]*src="\/media\//g, `<video src="${backendURL}media/`)
    .replace(/<video\s+[^>]*src="media\//g, `<video src="${backendURL}media/`);
    
  };

return (
  <section className="blog-detail-section">
    <div className="blog-detail-container">
      <div className="blog-image-wrapper">
        <img src={blog.thumbnail} alt={blog.title} className="blog-detail-image" />
      </div>

      <div className="blog-header">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta">
          <span>By {blog.author}</span>
          <span>•</span>

          <span>{blog.created_at}</span>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: fixImagePaths(blog.content) }}
        style={{ marginTop: "20px", lineHeight: "1.6" }}
      />

      <div className="blog-footer">
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    </div>
  </section>
)
}

export default BlogDetail
