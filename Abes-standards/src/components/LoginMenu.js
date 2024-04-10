import React, { useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';

import './LoginMenu.css';

const LoginMenu = () => {

    const { googleSignIn, githubSignIn, currentUser } = useAuth();

    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
        console.log("Signed in with Google");
      } catch (error) {
        console.error("Failed to sign in with Google:", error);
      }
    };

    const handleGithubSignIn = async () => {
      try {
        await githubSignIn();
        console.log("Signed in with Github");
      } catch (error) {
        console.error("Failed to sign in with Github:", error);
      }
    };


    return(
      <div className="loginMenuDiv" >
        <div className="menu loginMenu"  >
 
            <div className="menuItem" onClick={() => handleGoogleSignIn()} >
                <div className="menuText">Login with Google</div>
            </div>

            <div className="menuItem" onClick={() => handleGithubSignIn()} >
                <div className="menuText">Login with Github</div>
            </div>

        </div>
    </div>
    )
}

export default LoginMenu;