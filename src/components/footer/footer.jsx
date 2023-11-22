import React from 'react';
import logo from '../../assets/logo_shield.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './footer.css';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <h3 className="footer-title">About</h3>
                        <p className="desc">SMA Atma Budika (SMATMA) menyediakan pendidikan berkualitas tinggi yang holistik. 
                            Fasilitas modern, tim pengajar berdedikasi, dan pendekatan inovatif. 
                            Bentuk generasi penerus berintegritas, berwawasan luas, 
                            dan siap menghadapi masa depan.</p>
                    </div>
                    <div className="col-md-4 mt-4">
                        <h3 className="footer-title">Contact</h3>
                        <ul className='list-unstyled footer-contact mb-0'>
                            <li>
                                <div className="footer-text desc">  
                                    <FontAwesomeIcon icon={faPhone} className='icon' />  
                                    (+62) 897 4432 484
                                </div>
                            </li>
                            <li>                                
                                <div className="footer-text desc">
                                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                                    nicoherlim@gmail.com
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-2 mt-0">
                        <img src={logo} alt="Logo Shield" className="footer-logo-shield" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
