import React, { useState } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'

import './LandingPage.css'
import UserState from '../../constant/user_state.jsx'

import Header from '../../components/header/header.jsx'
import Footer from '../../components/footer/footer.jsx'
import HomePage from '../../components/home/home.jsx'
import Jurusan from '../jurusan/Jurusan.jsx'
import ErrorPage from '../error/ErrorPage.jsx'
import Login from '../authentication/Login.jsx'
import Register from '../authentication/Register.jsx';
import Biaya from '../biaya/Biaya.jsx'
import ForgotPass from '../authentication/ForgotPass.jsx'

function LandingPage() {
  const [state, setState] = useState(UserState.GUEST)
  const location = useLocation();

   // Define routes that should not have Header and Footer
   const noHeaderFooterRoutes = ['/login', '/register', '/forgotpassword'];

   // Check if the current route is in the list of routes without Header and Footer
   const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderHeaderFooter && <Header state={state} />}
      <main>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/biaya" element={<Biaya />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Navigate to="/home"/>}/>
        </Routes>
      </main>
      {shouldRenderHeaderFooter && <Footer />}
    </>
  )
}

export default LandingPage
