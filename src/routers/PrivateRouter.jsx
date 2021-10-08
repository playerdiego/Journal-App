import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

export const PrivateRouter = ({isAuth, component: Component, ...rest}) => {
    return (
        <Route {...rest}
            component={(props) => (
                isAuth
                    ? <Component {...props} />
                    : <Redirect to='/auth' />
            )}
        
        />
    )
};

PrivateRouter.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}
