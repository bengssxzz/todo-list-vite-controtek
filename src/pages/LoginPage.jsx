import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const checkUsername = async () => {
        setError("");

        try {
            const response = await axios.get('http://localhost:3000/tasks');
            const accounts = response.data;

            const user = accounts.find(account => account.username === username);

            if (!user) {
                setError("Username does not exist.");
                return;
            }

            if (user.password !== password) {
                setError("Incorrect password.");
                return;
            }

            // Login
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            alert("Login successful!");
            navigate('/home');

        } catch (error) {
            console.error("Error checking username:", error);
            setError("An error occurred while logging in.");
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#FAF0EF'
            }}
        >
            <Box
                sx={{
                    width: 350,
                    bgcolor: '#D2C9CA',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={checkUsername}
                >
                    Login
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/signup')}
                >
                    Signup
                </Button>
            </Box>
        </Box>
    );
}

export default LoginPage;
