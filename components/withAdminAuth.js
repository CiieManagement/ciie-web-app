// components/withAdminAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from './firebaseConfig';

const withAdminAuth = (WrappedComponent) => {
  const WithAdminAuth = (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && user.email === 'prasantshukla89@gmail.com') {
          setUser(user);
        } else {
          router.replace('/login');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return user ? <WrappedComponent {...props} user={user} /> : null;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`;

  return WithAdminAuth;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withAdminAuth;
