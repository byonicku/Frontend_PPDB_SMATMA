import React, { useState } from 'react';
import './authentication.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.username.value);
        console.log(e.target.password.value);
        navigate('/home');
    }

    const handleToggleShowPass = () => {
        setShowPass(!showPass);
    }

    const error = false; // Set the error state here

    return (
        <div className="row" style={{ minHeight: '100vh' }}>
            <div className="col-md-6" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
                <div className="d-flex flex-column py-5">
                    <h1 className="py-5 align-self-center">Sign In</h1>
                    {error && (
                        <div className="alert alert-warning align-self-center" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 pt-5 w-75 mx-auto">
                            <label htmlFor="username" className="form-label fw-bold">Username</label>
                            <input type="text" className="form-control py-2" id="username" name="username" placeholder="Username" required />
                        </div>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="password" className="form-label fw-bold">Password</label>
                            <div className="input-group">
                                <input type={ showPass ? 'text' : 'password'} className="form-control py-2" id="password" name="password" placeholder="Password" required />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleToggleShowPass}>
                                    {showPass ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 w-75 mx-auto text-end">
                            <a href="/register" style={{ color: '#494747' }}>Tidak punya akun?</a>
                        </div>
                        <div className="text-center" style={{ paddingTop: '100px', paddingBottom: '20px' }}>
                            <Link to="/forgotpassword" style={{ fontSize: '18px', color: 'dimgray' }}>Forgot your password?</Link>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn custom-btn px-5">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-6 gradient" style={{ paddingTop: '200px', paddingBottom: '40px' }}>
                <div className="d-flex flex-column py-5">
                    <h1 style={{ color: '#FFFFFF', fontSize: '86px' }} className="text-center">HELLO</h1>
                    <p style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: '200', maxWidth: '300px' }} className="align-self-center text-center pb-5">
                        Silahkan masuk menggunakan akun anda
                    </p>
                    <a href="#" style={{ color: '#FFFFFF', border: '1px solid #FFFFFF', fontSize: '30px', padding: '10px' }} className="align-self-center px-5">
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
