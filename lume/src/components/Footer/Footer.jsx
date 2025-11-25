import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <section className='footer-section'>
            <p>
                © {new Date().getFullYear()} All Rights Reserved By 
                <Link to="/" className="footer-copyright-link" > Lume</Link>
            </p>
        </section>
    )
}

export default Footer
