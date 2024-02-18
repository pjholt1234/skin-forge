"use client";

import React, { useState } from 'react';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import axios from "axios";
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const registrationEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL + '/register';
    const router = useRouter();

    const handleRegistration = async () => {
        console.log(password, passwordConfirmation);
        if (password !== passwordConfirmation) {
            console.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
    
            const response = await axios.post(
                registrationEndpoint,
                { email, password, name},
                {
                    headers: {
                        'authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
                    }
                }
            );

            router.push('/login');

    
            setLoading(false);
        } catch (error) {
            console.error('Registration failed:', error);
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
                <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }}>
                    <Input
                        variant="outlined"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4"
                    />
                    <Input
                        variant="outlined"
                        required
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-4"
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
                        className="mb-4"
                    />
                    <Input
                        variant="outlined"
                        required
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        autoComplete="current-password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="mb-4"
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

export default Register;
