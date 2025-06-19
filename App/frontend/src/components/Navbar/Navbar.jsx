// components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white dark:bg-black dark:border-gray-500 sticky border-b border-gray-300 w-full top-0 z-50 opacity-90">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-xl font-bold text-black dark:text-white">Medi AI</Link>
                    <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
                        <NavLinks />
                    </div>
                </div>

                <div className="hidden md:block text-gray-700 dark:text-gray-200 font-medium">
                    <Link to="/contact" className="hover:text-blue-500">Contact Me</Link>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <X size={24} className='dark:text-white' /> : <Menu size={24} className='dark:text-white' />}
                    </button>
                </div>
            </div>

            {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
        </nav>
    );
}
