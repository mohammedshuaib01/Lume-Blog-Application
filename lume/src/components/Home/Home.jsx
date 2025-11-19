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

                {blogs.map((blog) => (
                    <Link 
                    key={blog.id}
                    to={`/blog/${blog.id}`}
                    style={{textDecoration:'none', color:'inherit'}}>

                    <div  className='blog-card'>
                        <div className='blog-content'>
                            <h2>{blog.title}</h2>
                            <p>
                                {blog.excerpt
                                    .split(" ")
                                    .slice(0, 35)
                                    .join(" ")}...
                            </p>
                        </div>

                        <div className='blog-image-container'>
                            <img src={blog.cover_image} alt={blog.title} className='blog-image' />
                        </div>
                    </div>

                    </Link>

                ))}

            </div>

        </div>


    )
}

export default Home
