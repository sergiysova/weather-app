import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./scences/Home";
import Monitor from "./scences/Monitor";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/monitor" element={<Monitor />} />
        </Routes >
    </BrowserRouter>
)

export default AppRoutes;