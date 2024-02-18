"use client";

import React, { useState } from 'react';
import { Button, Input, Typography, Card, Skeleton } from '@material-tailwind/react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <Card className="mt-6 w-96 p-5">
            <Typography variant="h5">
                Sign in
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <Input
                    variant="outlined"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
    );
};

export default Login;
