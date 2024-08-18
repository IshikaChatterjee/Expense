// src/components/Navbar.js

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

const Navbar = ({ role }) => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('role'); // Clear the role from session storage
    router.push('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Expense Manager
        </Typography>
        <Box>
          {role === 'admin' && (
            <>
              <Button color="inherit" component={Link} href="/approve">
                Approve Expenses
              </Button>
              <Button color="inherit" component={Link} href="/">
                Submit Expense
              </Button>
            </>
          )}
          {role === 'user' && (
            <>
              <Button color="inherit" component={Link} href="/">
                Submit Expense
              </Button>
            </>
          )}
          {role && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
