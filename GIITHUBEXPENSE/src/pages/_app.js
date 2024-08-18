// src/pages/_app.js

import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Head from 'next/head';
import theme from '../theme';
import Navbar from '../components/Navbar';

export default function MyApp({ Component, pageProps }) {
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    // Get role from session storage
    const storedRole = sessionStorage.getItem('role');
    setRole(storedRole);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar role={role} />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
