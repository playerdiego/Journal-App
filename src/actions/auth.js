import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui";
import Swal from 'sweetalert2';
import { logoutClean } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(uiFinishLoading());
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error');
                dispatch(uiFinishLoading());
            });
        
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch(uiStartLoading());
        signInWithPopup(auth, googleAuthProvider)
            .then(result => {
                dispatch(login(result.user.uid, result.user.displayName));
                dispatch(uiFinishLoading());
            }).catch(e => {
                Swal.fire('Error', e.message, 'error');
                dispatch(uiFinishLoading());
            });
    }
}

export const startRegisterWithEmailPassword = (name, email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) => {
                await updateProfile(user, {
                    displayName: name
                })
                dispatch(login(user.uid, user.displayName));
                dispatch(uiFinishLoading());
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error');
                dispatch(uiFinishLoading());
            })
    }
};

export const startLogout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(logout());
                dispatch(logoutClean());
            });
    }
}

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
);

export const logout = () => ({
    type: types.logout,
});