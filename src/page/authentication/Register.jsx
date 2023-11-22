import React, { useState } from 'react';
import './authentication.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.nama_lengkap.value);
        console.log(e.target.email.value);
        console.log(e.target.username.value);
        console.log(e.target.password.value);
        navigate('/login');
    }

    const handleToggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="row" style={{ minHeight: '100vh' }}>
            <div className="col-md-6" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
                <div className="d-flex flex-column py-5">
                    <h1 className="py-5 align-self-center">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 pt-3 w-75 mx-auto">
                            <label htmlFor="nama_lengkap" className='fw-bold'>Nama Lengkap (Sesuai Akte)</label>
                            <input type="text" className="form-control py-2" id="nama_lengkap" name="nama_lengkap" placeholder="Nama Lengkap" required />
                        </div>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="email" className='fw-bold'>Email Pribadi</label>
                            <input type="email" className="form-control py-2" id="email" name="email" placeholder="Email Pribadi" required />
                        </div>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="username" className='fw-bold'>Username</label>
                            <input type="text" className="form-control py-2" id="username" name="username" placeholder="Username" required />
                        </div>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="password" className='fw-bold'>Password</label>
                            <div className="input-group">
                                <input type={showPass ? 'text' : 'password'} className="form-control py-2" id="password" name="password" placeholder="Password" required />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleToggleShowPass}>
                                    {showPass ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="text-center pt-4">
                            <button type="submit" className="btn custom-btn px-4">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-6 gradient" style={{ paddingTop: '128px', paddingBottom: '40px' }}>
                <div className="d-flex flex-column py-5">
                    <h1 style={{ color: '#FFFFFF', fontSize: '86px', maxWidth: '450px' }} className="align-self-center text-center pb-5">
                        WELCOME TO SMATMA
                    </h1>
                    <a href="#" style={{ color: '#FFFFFF', border: '1px solid #FFFFFF', fontSize: '30px', padding: '10px' }} className="align-self-center px-5">
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Register
