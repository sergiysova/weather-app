import React from 'react';
import {Link} from 'react-router-dom';

const Header: React.FunctionComponent = () => {
    return (
        <header className="flex justify-between items-center bg-gray-50 p-6 shadow-md shadow-gray-400">
            <Link to="/" className="logo font-bold">WeatherApp</Link>
            <a href="https://www.linkedin.com/in/serhii-sova-30b50815a/" className="bg-blue-500 transition-opacity hover:opacity-90 text-white font-bold py-2 px-4 rounded block">Contact Author</a>
        </header>
    );
}

export default Header;
