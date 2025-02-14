import {useState} from 'react'
import axios from "axios";

export const useAuthenticate = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const [error, setError] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false)
    }
    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {username, password});
            localStorage.setItem('token', response.data.access_token);
            setIsAuthenticated(!!response.data.access_token)
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleRegister = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {username, password});
            localStorage.setItem('token', response.data.access_token);
            setIsAuthenticated(response.data.access_token)
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return {
        isAuthenticated,
        error,
        handleLogin,
        handleRegister,
        handleLogout
    }
}