import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { uiRemoveError, uiSetError } from '../../actions/ui';
import { useSelector } from 'react-redux';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {loading, msgError} = useSelector( state => state.ui );

    const [{name, email, password, confirmPassword}, handleInputChange, reset] = useForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if(isFormValid()) {
            dispatch(startRegisterWithEmailPassword(name, email, password));
        }

    }

    const isFormValid = () => {

        if(name.trim().length === 0) {
            dispatch(uiSetError('Name is Required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(uiSetError('invalid email'));
            return false;
        } else if(password !== confirmPassword || password.length < 5) {
            dispatch(uiSetError('Invalid Password'));
            return false;
        }

        dispatch(uiRemoveError());


        return true;
    }

    return (
        <>
            <h3 className='auth__title animate__animated animate__fadeIn'>Create New Account</h3>

            <form onSubmit={handleRegister} className='animate__animated animate__fadeIn'>

                {
                    msgError &&
                        <div className="auth__alert-error">{msgError}</div>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className='auth__input'
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={name}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className='auth__input'
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className='auth__input'
                    onChange={handleInputChange}
                    value={password}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className='auth__input'
                    onChange={handleInputChange}
                    value={confirmPassword}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                    disabled= { loading }
                >
                    Register
                </button>
                
            </form>
            <Link to='/auth/login' className='link mt-5'>
                Already registered?
            </Link>

        </>
    )
}
