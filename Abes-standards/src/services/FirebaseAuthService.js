import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,  
  } from "firebase/auth";
  import { db, auth } from "../firebase/config.js";
  import { doc, setDoc } from "firebase/firestore";
  
  /**
   * Signs in a user using their email and password.
   * @param {string} email The user's email address.
   * @param {string} password The user's password.
   * @param {Function} onSuccess Callback function to execute on successful sign-in.
   * @param {Function} onError Callback function to execute on sign-in error.
   */
  const signIn = async (email, password, onSuccess, onError) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Optionally, handle additional tasks upon successful sign-in,
      // such as fetching user-specific data or updating application state.
      console.log("User signed in successfully:", userCredential.user);
  
      if (onSuccess) {
        onSuccess(userCredential.user);
      }
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      // Handle errors, such as incorrect password, user not found, etc.
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email. Please sign up.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled by an administrator.";
          break;
        // Add more error handling cases as needed.
        default:
          errorMessage = "Failed to sign in. Please try again later.";
          break;
      }
  
      if (onError) {
        onError(errorMessage);
      } else {
        alert(errorMessage);
      }
    }
  };
  
  // Sign in with OAuth provider
  const signInWithOauth = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in.
      // For example, redirect the user or update UI.
    } catch (error) {
      // Handle errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email; // The email of the user's account used by the popup.
      const credential = GoogleAuthProvider.credentialFromError(error);
  
      switch (errorCode) {
        case "auth/account-exists-with-different-credential":
          // User's email already exists with a different sign-in method.
          alert(
            `You have already signed up with a different auth provider for the following email: ${email}`
          );
          // Implement a mechanism to handle account linking here.
          break;
        case "auth/auth-domain-config-required":
          alert(
            "Authentication domain configuration required. Please check your Firebase authentication settings."
          );
          break;
        case "auth/cancelled-popup-request":
          // Multiple simultaneous sign-in attempts.
          // alert("Popup request cancelled. Please try again.");
          break;
        case "auth/popup-blocked":
          // alert(
          //   "Sign-in popup was blocked by the browser. Please allow popups and try again."
          // );
          break;
        case "auth/popup-closed-by-user":
          // alert("Sign-in popup was closed before completion. Please try again.");
          break;
        case "auth/unauthorized-domain":
          alert(
            "This domain is not authorized for OAuth operations for your Firebase project. Check your OAuth redirect domains list in the Firebase Console."
          );
          break;
        default:
          alert(`Error signing in with OAuth: ${errorMessage}`);
          break;
      }
    }
  };
  
  // Sign in with GitHub
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithOauth(provider);
  };
  
  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithOauth(provider);
  };
  
  // Sign in with Google
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithOauth(provider);
  };
  
  /**
   * Signs out the currently signed-in user.
   *
   * @param {Function} [onSuccess] Optional callback to execute on successful sign-out.
   * @param {Function} [onError] Optional callback to execute if an error occurs during sign-out.
   */
  const signOutUser = async (onSuccess, onError) => {
    try {
      await signOut(auth);
      // Optionally, reset any application state related to the user here
      // e.g., reset user state in context or Redux
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error signing out: ", error);
      if (onError) {
        onError(error);
      }
    }
  };
  
  /**
   * Registers a new user with email and password, sets the user's display name,
   * and stores additional user information in Firestore.
   *
   * @param {string} email User's email
   * @param {string} password User's password
   * @param {Object} additionalData Additional user information (e.g., displayName)
   * @returns {Promise<Object>} The user profile information
   */
  const registerUser = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      if (additionalData?.displayName) {
        await updateProfile(user, {
          displayName: additionalData.displayName,
        });
      }
  
      await setDoc(doc(db, "users", user.uid), {
        ...additionalData,
        createdAt: new Date(),
      });
  
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error(error.message);
    }
  };
  
  export {
    registerUser,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signOutUser,
  };
