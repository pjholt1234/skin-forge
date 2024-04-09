"use client";

import React, { useState } from 'react';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import axios from "axios";
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import InputError from '@/components/General/InputError';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const loginEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL + '/login';
    const cookies = useCookies();
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setEmailError('');
        setPasswordError('');

        if(email === ''){
            setEmailError('Email is required');
            setLoading(false);
            return;
        }

        if(password === ''){
            setPasswordError('Password is required');
            setLoading(false);
            return;
        }

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

            const token = response?.data?.token;
            cookies.set('token', token, { secure: true });
            router.push('/');

            setLoading(false);
        } catch (error) {
            setEmailError(' ');
            setPasswordError(' ');
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <Card className="mt-6 w-96 p-5" placeholder="placeholder">
                <Typography variant="h5">
                    Loading...
                </Typography>
            </Card>
        ) : (
            <Card className="mt-6 w-96 p-5" placeholder="placeholder">
                <Typography variant="h5" className="mb-5">
                    Sign in
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <Input
                        variant="standard"
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError !== ''}
                    />
                    <InputError error={emailError} />

                    <Input
                        variant="standard"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError !== ''}
                    />
                    <InputError error={passwordError} />

                    <div className="block text-sm grid grid-cols-2 mb-2">
                        <a href="/register">Register</a>
                        <a href="/forgot-password">Forgot your password?</a>
                    </div>

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
