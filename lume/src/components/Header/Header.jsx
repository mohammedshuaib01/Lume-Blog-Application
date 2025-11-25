import React, { useState, useEffect } from 'react'
import './Header.css'
import { FiEdit } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { getBlogs } from '../../api/BlogApi'

function Header() {
  const [query, setQuery] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  // Fetch all blogs once
  useEffect(() => {
    const fetchData = async () => {
      const blogs = await getBlogs();
      setAllBlogs(blogs);
    };
    fetchData();
  }, []);

  // Handle live suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const matched = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(value.toLowerCase())
    );

    // Show only first 4 suggestions
    setSuggestions(matched.slice(0, 4));
  };

  const handleSelect = (slug) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/blog/${slug}`);
  };

  return (
    <div className='header-section'>

      <div className='logo'>
        <Link to="/" className='logo-link'>
          <h2>Lume.</h2>
        </Link>
      </div>

      <div className='search-container'>
        <input
          type="text"
          placeholder='Search...'
          className='search-input'
          value={query}
          onChange={handleChange}
        />

        {suggestions.length > 0 && (
          <div className="suggestion-box">
            {suggestions.map(s => (
              <div
                key={s.id}
                className="suggestion-item"
                onClick={() => handleSelect(s.slug)}
              >
                {s.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/add-blog" className="add-icon-btn">
        <FiEdit size={26} />
      </Link>

    </div>
  )
}

export default Header
