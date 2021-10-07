import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import createAuth0Client from '@auth0/auth0-spa-js';

const INVALID_STATE_MESSAGE =
    'It looks like you need to update your bookmark. Please select login below, enter your credentials, then re-save your bookmark after fully logging in.';

const DEFAULT_REDIRECT_CALLBACK = (appState, history) => {
    // history.replace({}, document.title, window.location.pathname);
};

export const Auth0Context = React.createContext();

// Used in class components
export const Auth0Consumer = Auth0Context.Consumer;

// Used in function components
export function useAuth0() {
    const context = useContext(Auth0Context);
    if (!context) {
        throw new Error(`useAuth0 must be used within a Auth0Provider`);
    }
    return context;
}

// Provider
export function Auth0Provider({
                                  children,
                                  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                                  ...initOptions
                              }) {
    const [auth0Client, setAuth0] = useState();
    const [error, setError] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [userProfile, setUserProfile] = useState({});
    const history = useHistory();
    useEffect(() => {
        // We don't want to do this during Cypress tests, and its far too complicated to ensure its working during Cypress tests. Also we cannot test this functionality in Cypress either - can't test multiple tabs.

        let interval;
        if (isAuthenticated) {
            interval = setInterval(async () => {
                const isAuthenticated = await auth0Client.isAuthenticated();
                if (
                    !isAuthenticated ||
                    !(localStorage.getItem('isLoggedIn') === 'true')
                ) {
                    setIsAuthenticated(false);
                }
            }, 15000);
        }

        return () => clearInterval(interval);
    }, [isAuthenticated, auth0Client]);

    useEffect(() => {
        const initAuth0 = async () => {
            try {
                const auth0FromHook = await createAuth0Client(initOptions);
                setAuth0(auth0FromHook);

                if (window.location.search.includes('code=')) {
                    const { appState } = await auth0FromHook.handleRedirectCallback();
                    onRedirectCallback(appState, history);
                }

                const isAuthenticated = await auth0FromHook.isAuthenticated();
                setIsAuthenticated(isAuthenticated);

                if (isAuthenticated) {
                    const user = await auth0FromHook.getUser();
                    setUser(user);

                    localStorage.setItem('isLoggedIn', 'true');

                    const accessToken = await auth0FromHook.getTokenSilently();
                    // this way of setting the auth header is specific to Axios.
                    axios.defaults.headers.common.authorization = `bearer ${accessToken}`;

                    // get user profile
                    const profile = await axios
                        .get(`${process.env.REACT_APP_API_URL}/mainUserProfile`, {
                            headers: { authorization: `bearer ${accessToken}` }
                        })
                        .catch(error => {
                            console.log(error);
                            // history.replace(`/accessDenied?error=${error}`);
                        });

                    if (!(profile || '').data) {
                        auth0FromHook.logout({ returnTo: window.location.origin });
                    } else {
                        const userProfile = getUserProfile(profile.data);
                        if (!profile.resources && userProfile.resources) {
                            // There are lots of resources in this array that are included for backwards compat, remove those so we don't have to loop over them again.
                            const resources = userProfile?.resources?.filter(
                                r => !Boolean(r.conditions)
                            );
                            const filteredProfile = {
                                ...userProfile,
                                resources
                            };
                            setUserProfile(filteredProfile);
                        }
                    }
                }
            } catch (error) {
                // TODO this is gross, but so far have been unable to debug the error to see what they actually look like. So we have to test all these variations.
                setError(
                    error?.errorDescription?.match(/invalid state/i) ||
                    error?.message?.match(/invalid state/i)
                        ? INVALID_STATE_MESSAGE
                        : error?.errorDescription || error?.message || 'Not Authorized'
                );
            } finally {
                setLoading(false);
            }
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const logout = (...p) => {
        localStorage.removeItem('isLoggedIn');
        auth0Client.logout(...p);
    };

    const changePassword = async () => {};

    return (
        <Auth0Context.Provider
            value={{
                error,
                isAuthenticated,
                user,
                userProfile,
                setUserProfile,
                loading,
                logout,
                changePassword,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
}

function getUserProfile(userData) {
    const { appMetadata, profile, userType = 'agent' } = userData;
    let entity = {};

    if (userType.toLowerCase() === 'agent') {
        if (appMetadata && appMetadata.agencyCode) {
            entity = {
                agencyCode: appMetadata.agencyCode,
                companyCode: appMetadata.companyCode,
                state: appMetadata.state
            };
        } else {
            entity = {
                agencyCode: profile.agencyCode,
                companyCode: profile.companyCode,
                state: profile.state
            };
        }
    } else if (userType.toLowerCase() === 'internal') {
        if (profile.groups) {
            entity = {
                agencyCode: profile.groups[0].extendedProperties.agencyCode,
                companyCode: profile.groups[0].extendedProperties.companyCode,
                state: profile.groups[0].extendedProperties.state
            };
        } else {
            entity = {
                agencyCode: profile.agencyCode,
                companyCode: profile.companyCode,
                state: profile.state
            };
        }
    }

    const isInternal = (userData.userType || '').toLowerCase() === 'internal';

    return {
        ...userData,
        entity,
        isInternal
    };
}
