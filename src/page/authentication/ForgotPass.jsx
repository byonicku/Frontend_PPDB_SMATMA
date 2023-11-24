import React, { useState } from 'react';
import './authentication.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Gradient from '../../components/authentication/gradient';

const ForgotPass = () => {
    const navigate = useNavigate();
    const [showPassOld, setShowPassOld] = useState(false);
    const [showPassNew, setShowPassNew] = useState(false);
    const [showPassCheck, setShowPassCheck] = useState(false);

    const error = false; // Set the error state here

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.passwordOld.value);
        console.log(e.target.passwordNew.value);
        console.log(e.target.passwordCheck.value);

        if (e.target.passwordNew.value !== e.target.passwordCheck.value) {
            console.log("Password tidak sama");
            return;
        }

        navigate('/login');
    }

    const handleToggleShowPassOld = () => {
        setShowPassOld(!showPassOld);
    }

    const handleToggleShowPassNew = () => {
        setShowPassNew(!showPassNew);
    }

    const handleToggleShowPassCheck = () => {
        setShowPassCheck(!showPassCheck);
    }

    return (
        <div className="row" style={{ minHeight: '100vh' }}>
            <div className="col-md-6" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
            <Link to="/login" className='nav-link ps-5'><FontAwesomeIcon icon={faArrowLeft} className='icon text-black'/></Link>
                <div className="d-flex flex-column py-5">
                    <h1 className="py-5 align-self-center">Forgot Password</h1>
                    {error && (
                        <div className="alert alert-warning align-self-center" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 pt-5 w-75 mx-auto">
                            <label htmlFor="passwordOld" className="form-label fw-bold">Password Lama</label>
                            <div className="input-group">
                                <input type={showPassOld ? 'text' : 'password'} className="form-control py-2" id="passwordOld" name="passwordOld" placeholder="Password Lama" required />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleToggleShowPassOld}>
                                    {showPassOld ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="passwordNew" className="form-label fw-bold">Password Baru</label>
                            <div className="input-group">
                                <input type={showPassNew ? 'text' : 'password'} className="form-control py-2" id="passwordNew" name="passwordNew" placeholder="Password Baru" required />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleToggleShowPassNew}>
                                    {showPassNew ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="passwordCheck" className="form-label fw-bold">Masukan Ulang Password Baru</label>
                            <div className="input-group">
                                <input type={showPassCheck ? 'text' : 'password'} className="form-control py-2" id="passwordCheck" name="passwordCheck" placeholder="Masukan Ulang Password Baru" required />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleToggleShowPassCheck}>
                                    {showPassCheck ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn custom-btn px-5">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <Gradient text={"Forgot Password"} tagline={"Silahkan masukan email anda untuk reset password"} use={"Reset!"}/>
        </div>
    );
};

export default ForgotPass;
