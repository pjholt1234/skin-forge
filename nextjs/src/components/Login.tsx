"use client";

import React, { useState } from 'react';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import axios from "axios";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const loginEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL + '/login';

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                loginEndpoint,
                { email, password },
                {
                    headers: {
                        'authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
                    }
                }
            );

            const token = response.data.token;
            localStorage.setItem('token', token);
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <Card className="mt-6 w-96 p-5">
                <Typography variant="h5">
                    Loading...
                </Typography>
            </Card>
        ) : (
            <Card className="mt-6 w-96 p-5">
                <Typography variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <Input
                        variant="outlined"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        variant="outlined"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="filled"
                        color="blue"
                    >
                        Sign In
                    </Button>
                </form>
            </Card>
        )
    );
};

export default Login;
