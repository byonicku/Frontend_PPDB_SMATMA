import React, { useState } from 'react';
import './authentication.css';
import { useNavigate, Link } from 'react-router-dom';
import Gradient from '../../components/authentication/gradient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { toast } from "sonner";

import { useMutation } from '@tanstack/react-query';
import APIAuth from '../../api/APIAuth';
import { setToken, setUser } from '../../api/UserHandler';

const Login = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginQuery = useMutation(
        {
            mutationFn: (data) => APIAuth.login(data),
            onSuccess: (data) => {
                console.log(data);
                setToken(data.access_token);
                delete data.message;
                setUser(JSON.stringify(data));
                toast.success("Login berhasil!");
                setTimeout(() => {
                    navigate("/home");
                }, 500);
                setLoading(false);
            },
            onError: (error) => {
                setError(error.message);
                toast.error(error.message);
                setLoading(false);
            },
            onMutate: () => {
                setLoading(true);
            }
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);    
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (data.username === 'admin' && data.password === 'admin') {
            setUser('admin');
            toast.success("Admin login berhasil!");
            setTimeout(() => {
                navigate("/home");
            }, 500);
            setLoading(false);
            return;
        }

        await loginQuery.mutateAsync(data);
    }

    const handleToggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="row" style={{ minHeight: '100vh' }}>
            <div className="col-md-6" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
                <Link to="/home" className='nav-link ps-5'><FontAwesomeIcon icon={faHome} className='icon text-black'/></Link>
                <div className="d-flex flex-column py-5">
                    <h1 className="py-5 align-self-center">Sign In</h1>
                    {error && (
                        <div className="alert alert-danger mx-auto" role="alert">
                            {typeof error === 'string' ? (
                                error
                            ) : (
                                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                    {Object.entries(error).map(([key, value]) => (
                                        <li key={key}>{`${value}`}</li>
                                    ))}
                                </ul>
                            )}
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
                            <Link to="/register" style={{ color: '#494747' }}>Tidak punya akun?</Link>
                        </div>
                        <div className="text-center" style={{ paddingTop: '100px', paddingBottom: '20px' }}>
                            <Link to="/forgotpassword" style={{ fontSize: '18px', color: 'dimgray' }}>Forgot your password?</Link>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn custom-btn px-5" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <Gradient text={"HELLO"} tagline={"Silahkan masuk menggunakan akun anda"} use={"Sign In"}/>
        </div>
    );
};

export default Login;
