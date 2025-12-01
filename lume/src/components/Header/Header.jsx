import React, { useState, useEffect } from 'react'
import './Header.css'
import { FiEdit } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { getBlogs } from '../../api/BlogApi'

function Header() {
  const [query, setQuery] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await getBlogs();
      setAllBlogs(blogs);
    };
    fetchData();
  }, []);

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

    setSuggestions(matched.slice(0, 4));
  };

  const handleSelect = (slug) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/blog/${slug}`);
  };

  return (
    <div className='header-section'>

  {/* Logo */}
  <div className='logo'>
    <Link to="/" className='logo-link'>
      <h2>Lume.</h2>
    </Link>
  </div>

  {/* Middle: Search Container */}
  <div className='search-container'>

    {/* Desktop Search */}
    <div className="desktop-search">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder='Search...'
          className='search-input'
          value={query}
          onChange={handleChange}
        />

        {query.length > 0 && (
          <span
            className="clear-btn"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
          >
            ✕
          </span>
        )}
      </div>

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

    {/* Mobile Search Overlay */}
    {showMobileSearch && (
      <div className="mobile-search-wrapper">

        <div className="mobile-search-input-wrapper">
          <input
            type="text"
            autoFocus
            placeholder="Search..."
            className="mobile-search-input"
            value={query}
            onChange={handleChange}
          />

          {query.length > 0 && (
            <span
              className="mobile-clear-btn"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
              }}
            >
              ✕
            </span>
          )}
        </div>

        <button
          className="mobile-close-btn"
          onClick={() => {
            setShowMobileSearch(false);
            setQuery("");
            setSuggestions([]);
          }}
        >
          ✕
        </button>

        {suggestions.length > 0 && (
          <div className="mobile-suggestion-box">
            {suggestions.map(s => (
              <div
                key={s.id}
                className="suggestion-item"
                onClick={() => {
                  setShowMobileSearch(false);
                  handleSelect(s.slug);
                }}
              >
                {s.title}
              </div>
            ))}
          </div>
        )}
      </div>
    )}

  </div>

  {/* RIGHT SIDE: search icon + avatar */}
  <div className="right-section">

    {/* Mobile search icon */}
    <i
      className="fa-solid fa-magnifying-glass mobile-search-icon"
      onClick={() => setShowMobileSearch(true)}
    ></i>

    {/* Avatar */}
    {localStorage.getItem("adminToken") && (
      <Link to="/admin/dashboard" className="avatar-wrapper">
        <img
          src="/avatar.webp"
          alt="Admin"
          className="avatar-image"
        />
      </Link>
    )}

  </div>

</div>

  )
}

export default Header
