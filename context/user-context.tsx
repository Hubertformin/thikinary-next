import React, { useState, useEffect, createContext, useContext } from 'react'
import {fire} from "../core";
import cookie from 'js-cookie';


export const UserContext = createContext(null);

export default function UserContextComp({ children }) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true); // Helpful, to edit the UI accordingly.
    const tokenName = 'authToken';

    useEffect(() => {
        // Listen authenticated user
        const unsubscriber = fire.auth().onAuthStateChanged(async (user) => {
            try {
                if (user) {
                    // get id token
                    const {claims} = await fire.auth().currentUser.getIdTokenResult();
                    // User is signed in.
                    const { uid, displayName, email, photoURL} = user;
                    // You could also look for the user doc in your Firestore (if you have one):
                    // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
                    setUser({ uid, displayName, email, photoURL, claims });
                    // set cookie
                    const token = await user.getIdToken();
                    cookie.set(tokenName, token, { expires: 30 });
                } else {
                    cookie.remove(tokenName);
                    setUser(null);
                }
            } catch (error) {
                // Most probably a connection error. Handle appropriately.
            } finally {
                setLoadingUser(false)
            }
        });

        // Unsubscribe auth listener on unmount
        return () => unsubscriber();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loadingUser }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
