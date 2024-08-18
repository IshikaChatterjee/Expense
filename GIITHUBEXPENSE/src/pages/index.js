// src/pages/index.js

import React, { useState } from 'react';
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
import withAuth from '../hoc/withAuth';

function Home() {
  const [employeeName, setEmployeeName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const submitExpense = async () => {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeName, amount, description }),
    });
    if (res.ok) {
      alert('Expense submitted!');
    } else {
      alert('Submission failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Submit Expense
            </Typography>
            <TextField
              fullWidth
              label="Employee Name"
              variant="outlined"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Amount in INR"
              type="number"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={submitExpense}
              sx={{ ml: 1, mb: 1 }}
              fullWidth
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default withAuth(Home, ['user','admin']); // Only allow 'user' role
