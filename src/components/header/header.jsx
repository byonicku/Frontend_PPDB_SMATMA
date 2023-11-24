import React, { useState } from 'react';
import logo from '../../assets/logo_full.png';
import UserState from '../../constant/user_state.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../api/APIConstant';
import UserHandler, { isAuthenticated } from '../../api/UserHandler.jsx';

const Header = () => {
    const [state, setState] = useState(isAuthenticated() ? UserState.USER : UserState.GUEST);

    const navigate = useNavigate();
    const logoutMutation = useMutation(
        {
            mutationFn: () => axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }),
            onSuccess: () => {
                toast.success("Logout berhasil!");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setState(UserState.GUEST);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        }
    );

    const handleLogout = async (e) => {
        await logoutMutation.mutateAsync();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-5" style={{ backgroundColor: '#0c84a4' }}>
            <div className="container">
                <a className="navbar-brand rounded" style={{ backgroundColor: '#ffffff' }} href="/home">
                    <img src={logo} width="250px" alt="Logo" />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {state === UserState.GUEST && (
                            <>
                                <li className="nav-item">
                                    <Link to="/home" className='nav-link'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/jurusan" className='nav-link'>Jurusan</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/biaya" className='nav-link'>Biaya</Link>
                                </li>
                            </>
                        )}

                        {state === UserState.USER && (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className='nav-link'>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pembayaran" className='nav-link'>Pembayaran</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/berkas" className="nav-link">Berkas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/status" className='nav-link'>Status</Link>
                                </li>
                            </>
                        )}

                        {state == UserState.ADMIN && (
                            <li className="nav-item">
                                <Link to="/masterdata" className='nav-link'>Master Data</Link>
                            </li>
                        )}

                        <li className="nav-item">
                            {state == UserState.GUEST ? (
                                <a href="/login" className="btn btn-primary rounded-pill px-4 border-0"
                                    style={{ backgroundColor: '#ffd6a4', color: 'black', fontSize: '24px', fontWeight: 500, marginLeft: 10, marginTop: 2}}>
                                    Login
                                </a>
                            ) : (
                                <a onClick={handleLogout} className="btn btn-primary rounded-pill px-4 border-0"
                                    style={{ backgroundColor: '#FFA4A4', color: 'black', fontSize: '24px', fontWeight: 500, marginLeft: 10, marginTop: 2}}>
                                    Logout
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
