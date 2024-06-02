import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AstrologerRegister from './components/AstrologerRegister';
import UserRegister from './components/UserRegister';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register/astrologer" element={<AstrologerRegister />} />
                <Route path="/register/user" element={<UserRegister />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;