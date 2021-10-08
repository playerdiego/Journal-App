import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { uiRemoveError, uiSetError } from '../../actions/ui';
import { useSelector } from 'react-redux';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const {loading, msgError} = useSelector(state => state.ui);

    const [{email, password}, handleInputChange, reset] = useForm({
        email: "",
        password: ""
    });

    const handleLogin = (e) => {
        
        e.preventDefault();

        if(isFormValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }

    }

    const isFormValid = () => {

        if(!validator.isEmail(email)) {
            dispatch(uiSetError('Invalid Email'));
            return false;
        } else if (password.lenth < 5) {
            dispatch(uiSetError('Invalid Password'));
            return false;
        }

        dispatch(uiRemoveError());
        return true;
        
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();

        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className='auth__title animate__animated animate__fadeIn'>Login</h3>

            <form onSubmit={handleLogin} className='animate__animated animate__fadeIn'>
                {
                    msgError &&
                        <div className="auth__alert-error">{msgError}</div>
                }
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled= { loading }
                >
                    Login
                </button>
                
                <div className='auth__social-networks'>
                    <p>Login wiht Social Networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>
                
            </form>

            <Link to='/auth/signup' className='link'>
                Create new Account
            </Link>
        </>
    )
}
