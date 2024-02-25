"use client";

import React, { useState } from 'react';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import InputError from '@/components/General/InputError';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

    const [loading, setLoading] = useState(false);

    const registrationEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL + '/register';
    const router = useRouter();

    const handleRegistration = async () => {
        setLoading(true);

        setEmailError('');
        setNameError('');
        setPasswordError('');
        setPasswordConfirmationError('');
        
        if(password !== passwordConfirmation){
            setPasswordConfirmationError('Passwords do not match');
            setLoading(false);
            return;
        }

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
        } catch (error: any) {
            if(error.response.status === 400){
                if(error.response?.data?.email){
                    setEmailError(error.response.data.email)
                }

                if(error.response?.data?.name){
                    setNameError(error.response.data.name)
                }

                if(error.response?.data?.password){
                    setPasswordError(error.response.data.password)
                }

                return;
            }

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
                <Typography variant="h5" className="mb-4">
                    Sign in
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }}>
                    <Input
                        variant="standard"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4"
                        error={ emailError !== '' }
                    />
                    <InputError error={emailError}/>
                    <Input
                        variant="standard"
                        required
                        id="name"
                        label="Username"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-4"
                        error={ nameError !== '' }
                    />
                    <InputError error={nameError}/>
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
                        className="mb-4"
                        error={ passwordError !== '' }
                    />
                    <InputError error={passwordError}/>
                    <Input
                        variant="standard"
                        required
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        autoComplete="current-password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="mb-4"
                        error={ passwordConfirmationError !== '' }
                    />
                    <InputError error={passwordConfirmationError}/>
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
