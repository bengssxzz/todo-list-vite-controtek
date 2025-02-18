import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
    const [newUsername, setNewUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPassword1, setUserPassword1] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const checkUserExists = async (username) => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            const accounts = response.data;
            return accounts.some(account => account.username === username);
        } catch (error) {
            console.error("Error checking user existence: ", error);
            return false;
        }
    };

    const createAccount = async () => {
        // Reset error message
        setError("");

        // Check if passwords match
        if (userPassword !== userPassword1) {
            setError("Passwords do not match.");
            return;
        }

        // Check if username is already taken
        const userExists = await checkUserExists(newUsername);
        if (userExists) {
            setError("Username already exists.");
            return;
        }

        // Create new account
        try {
            const newAccount = {
                "username": newUsername,
                "password": userPassword,
                "taskTitle": "Todo List Title",
                "taskList": []
            };
            await axios.post('http://localhost:3000/tasks', newAccount);
            alert("Account created successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error creating account: ", error);
            setError("An error occurred while creating the account.");
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
                    Signup
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
                    color='white'
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    color='white'
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Re-Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    color='white'
                    value={userPassword1}
                    onChange={(e) => setUserPassword1(e.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={createAccount}
                >
                    Create
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/')}
                >
                    Back
                </Button>
            </Box>
        </Box>
    );
}

export default SignupPage;