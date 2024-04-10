import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config.js';
import { signInWithGoogle, signInWithGithub, signInWithFacebook, signOutUser, signIn,
  registerUser, } from '../services/FirebaseAuthService.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [providerDetails, setProviderDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        const details = user.providerData.map(provider => ({
          displayName: provider.displayName,
          email: provider.email,
          photoURL: provider.photoURL,
          providerId: provider.providerId,
        }));
        setProviderDetails(details);
        // console.log(JSON.stringify(details));
      } else {
        setProviderDetails(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const googleSignIn = () => {
    return signInWithGoogle(); 
  };

  const githubSignIn = () => {
    return signInWithGithub(); 
  };

  const facebookSignIn = () => {
    return signInWithFacebook(); 
  };

  const value = {
    currentUser,
    providerDetails,
    googleSignIn, 
    githubSignIn,
    facebookSignIn,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};