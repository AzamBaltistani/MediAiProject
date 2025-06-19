import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Screen Time & Sanity', path: '/screen-time-effect' },
    { name: 'Disease Prediction', path: '/disease-prediction' },
    { name: 'AI Health Assistant', path: '/ai-health-assistant' },
];

export default function NavLinks({ onClick, mobile = false }) {
    const location = useLocation();

    return (
        <>
            {navItems.map(item => {
                const isActive = location.pathname === item.path;

                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        onClick={onClick}
                        className={`relative ${mobile ? 'block w-full text-left px-4 py-2' : 'px-4 py-1.5'
                            } rounded-full transition-all duration-300
                        ${isActive
                                ? 'bg-blue-100 dark:bg-blue-900'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </>
    );
}
