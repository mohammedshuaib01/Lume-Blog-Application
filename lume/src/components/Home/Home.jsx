import React, { useState, useEffect } from 'react'
import './Home.css'
import { getBlogs } from '../../api/BlogApi'
import { Link } from 'react-router-dom'

function Home() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlogs();
            setBlogs(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, [])


    return (
        <div className='home-section'>
            <div className='home-container'>

                {blogs.map((blog) => {
                    const title = blog.title || "";
                    const excerpt = blog.excerpt || "";   // SAFE
                    const shortExcerpt = excerpt
                        .split(" ")
                        .slice(0, 35)
                        .join(" ");

                    const formattedDate = new Date(blog.created_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",

                    });

                    return (
                        <Link
                            key={blog.id}
                            to={`/blog/${blog.slug}`}   // better to use slug
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className='blog-card'>
                                <div className='blog-content'>

                                    <div className='author-details'>
                                        <div><img src="/author.jpg" alt="" /></div>
                                        <p>Mohammed Shuaib</p>
                                        <span className="date-italic">{formattedDate}</span>
                                    </div>

                                    <h2>{title}</h2>
                                    <p>{shortExcerpt}...</p>
                                </div>

                                <div className='blog-image-container'>
                                    <img
                                        src={blog.cover_image || "/placeholder.jpg"} // SAFE fallback
                                        alt={title}
                                        className='blog-image'
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}

            </div>
        </div>
    )
}

export default Home
