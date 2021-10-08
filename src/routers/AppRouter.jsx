import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { startLoadNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [cheking, setCheking] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {

            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsAuth(true);

                
                dispatch(startLoadNotes(user.uid));
            } else {
                setIsAuth(false);
            }
            setCheking(false);

        });


    }, [dispatch, setCheking, setIsAuth]);

    if(cheking) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter path='/auth' component={AuthRouter} isAuth={isAuth} />
                    <PrivateRouter exact path='/' component={JournalScreen} isAuth={isAuth} />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
