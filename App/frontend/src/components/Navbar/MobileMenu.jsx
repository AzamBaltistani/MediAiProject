import React from 'react';
import NavLinks from './NavLinks';

export default function MobileMenu({ onClose }) {
    return (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-3">
            <NavLinks onClick={onClose} mobile />
            <button
                onClick={onClose}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
            >
                Contact Me
            </button>
        </div>
    );
}
