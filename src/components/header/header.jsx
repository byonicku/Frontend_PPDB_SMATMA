import React, { useState } from 'react';
import logo from '../../assets/logo_full.png';
import UserState from '../../constant/user_state.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";

import { useMutation } from '@tanstack/react-query';
import APIAuth from '../../api/APIAuth.jsx';
import { isAuthenticated, clearLocalStorage, isAdmin } from '../../api/UserHandler.jsx';

const Header = () => {
    const [state, setState] = useState(
        isAdmin() ? UserState.ADMIN :
        isAuthenticated() ? UserState.USER : UserState.GUEST
    );

    const navigate = useNavigate();
    const logoutMutation = useMutation(
        {
            mutationFn: () => APIAuth.logout(),
            onSuccess: () => {
                toast.success("Logout berhasil!");
                clearLocalStorage();
                setState(UserState.GUEST);
                setTimeout(() => {
                    navigate("/");
                }, 500);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        }
    );

    const handleLogout = async (e) => {
        if (state === UserState.ADMIN) {
            toast.success("Logout berhasil!");
            setTimeout(() => {
                navigate("/");
            }, 500);
            clearLocalStorage();
            setState(UserState.GUEST);
            return;
        }

        await logoutMutation.mutateAsync();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-5" style={{ backgroundColor: '#0c84a4' }}>
            <div className="container">
                <a className="navbar-brand rounded" style={{ backgroundColor: '#ffffff' }} href="/">
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
                                    <Link to="/" className='nav-link'>Home</Link>
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

                        {state === UserState.ADMIN && (
                            <li className="nav-item">
                                <Link to="/masterdata" className='nav-link'>Master Data</Link>
                            </li>
                        )}

                        <li className="nav-item">
                            {state == UserState.GUEST ? (
                                <Link to="/login" className="btn btn-primary rounded-pill px-4 border-0"
                                    style={{ backgroundColor: '#ffd6a4', color: 'black', fontSize: '24px', fontWeight: 500, marginLeft: 10, marginTop: 2}}>
                                    Login
                                </Link>
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
