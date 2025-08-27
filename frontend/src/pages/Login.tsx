import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import { AuthService } from '../services/AuthService';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            
            const res = await apiClient.post("/login/", { email, password });

            if (res.status === 200) {
                AuthService.setToken(res.data.access);
                window.location.href = "/";
            } else {
                alert("Pogrešan email ili lozinka.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Greška prilikom prijave. Pokušajte ponovo kasnije.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-96 space-y-4"
            >
               <h2 className="text-2xl font-bold">Login</h2>

               <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2 border px-3 py-2 rounded'
                    required
                />
                <input
                    type='password'
                    placeholder='Lozinka'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-2 border px-3 py-2 rounded'
                    required
                />
                <button
                    type='submit'
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Prijavi se
                </button>
            </form>
        </div>
    );
}
