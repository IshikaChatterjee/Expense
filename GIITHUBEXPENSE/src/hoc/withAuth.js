// src/hoc/withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const role = sessionStorage.getItem('role');
      if (!role || !allowedRoles.includes(role)) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
