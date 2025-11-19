import React from 'react'
import './Header.css'
import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className='header-section'>
      <div className='logo'>
        <h2>Lume.</h2>
      </div>



      <div className='search-container'>
        <input
          type="text"
          placeholder='Search...'
          className='search-input' />



        <button type='submit'>Search</button>
      </div>

         {/* Icon Only Add Blog Button */}
      <Link to="/add-blog" className="add-icon-btn">
        <FiEdit size={26} />
      </Link>


    </div>
  )
}

export default Header
