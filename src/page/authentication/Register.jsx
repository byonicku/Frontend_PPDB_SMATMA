import React, { useState } from 'react';
import './authentication.css';
import { Link, useNavigate } from 'react-router-dom';
import Gradient from '../../components/authentication/gradient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { toast } from "sonner";

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../api/APIConstant';

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerMutation = useMutation(
        {
            mutationFn: (data) => axios.post(`${API_URL}/register`, data),
            onSuccess: () => {
                toast.success("Register berhasil! Check email anda untuk verifikasi akun.");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            },
            onError: (error) => {
                setError(error.response.data.message);
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

        await registerMutation.mutateAsync(data);
    }

    const handleToggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="row" style={{ minHeight: '100vh', overflowY: 'hidden' }}>
            <div className="col-md-6" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
            <Link to="/home" className='nav-link ps-5'><FontAwesomeIcon icon={faHome} className='icon text-black'/></Link>
                <div className="d-flex flex-column py-5">
                    <h1 className="py-3 align-self-center">Register</h1>
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
                        <div className="mb-3 w-75 mx-auto text-end">
                            <Link to="/login" style={{ color: '#494747' }}>Sudah punya akun?</Link>
                        </div>
                        <div className="pt-4 text-center">
                            <button type="submit" className="btn custom-btn px-5" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <Gradient text={"WELCOME"} tagline={"Silahkan daftar menggunakan data diri anda"} use={"Register"}/>
        </div>
    );
}

export default Register
