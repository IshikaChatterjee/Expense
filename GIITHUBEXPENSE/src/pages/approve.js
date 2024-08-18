// src/pages/approve.js

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import withAuth from '../hoc/withAuth';

function Approve() {
  const [expenses, setExpenses] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch('/api/expenses');
      const data = await res.json();
      setExpenses(data.data);
    };
    fetchExpenses();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setExpenses(expenses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
    }
  };

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filterStatus === 'All') return true;
    return expense.status === filterStatus;
  });

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Approve Expenses
        </Typography>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={handleStatusChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <List>
          {filteredExpenses.map((expense) => (
            <ListItem key={expense._id} divider>
              <ListItemText
                primary={`${expense.employeeName}: ₹${expense.amount}`}
                secondary={expense.description}
              />
              <ListItemSecondaryAction>
                {expense.status === 'Pending' ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateStatus(expense._id, 'Approved')}
                      sx={{ mr: 2 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => updateStatus(expense._id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Typography
                    variant="body2"
                    color={expense.status === 'Approved' ? 'green' : 'red'}
                  >
                    {expense.status}
                  </Typography>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default withAuth(Approve, ['admin']);
