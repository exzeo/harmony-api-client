import React, { useEffect } from 'react';

import { useAuth0 } from './context/auth-context';

const UnauthenticatedApp = () => {
    const { loginWithRedirect, error } = useAuth0();
    useEffect(() => {
        const targetUrl = window.location.pathname;

        const fn = async () => {
            await loginWithRedirect({
                appState: { targetUrl }
            });
        };

        if (!error) {
            fn();
        }
    }, [loginWithRedirect, error]);

    return <>{error && <div>Unauthenticated</div>}</>;
};

export default UnauthenticatedApp;
