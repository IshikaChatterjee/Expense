// src/pages/login.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store role in session storage
        sessionStorage.setItem('role', data.role);

        // Redirect based on role
        if (data.role === 'admin') {
          router.push('/approve');
        } else if (data.role === 'user') {
          router.push('/');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ ml: 1, mb: 1 }}
              fullWidth
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
