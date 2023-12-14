import React, { useState } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './LandingPage.css'
import Header from '../../components/header/header.jsx'
import Footer from '../../components/footer/footer.jsx'
import HomePage from '../../components/home/home.jsx'
import Jurusan from '../jurusan/Jurusan.jsx'
import ErrorPage from '../error/ErrorPage.jsx'
import Biaya from '../biaya/Biaya.jsx'
import ForgotPass from '../authentication/ForgotPass.jsx'
import Login from '../authentication/Login.jsx'
import Register from '../authentication/Register.jsx'
import Profile from '../user/Profile.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import BerkasRoutes from './BerkasRoutes.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import DataDiri from '../berkas/DataDiri.jsx';
import DataOrangTua from '../berkas/DataOrangTua.jsx';
import SuccessPage from '../success_page/SuccessPage.jsx';
import AlreadyInputPage from '../success_page/AlreadyInputPage.jsx';
import Pembayaran from '../user/Pembayaran.jsx';

const queryClient = new QueryClient();

function LandingPage() {
  const location = useLocation();

   // Define routes that should not have Header and Footer
   const noHeaderFooterRoutes = ['/login', '/register', '/forgotpassword'];

   // Check if the current route is in the list of routes without Header and Footer
   const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {shouldRenderHeaderFooter && <Header />}
        <Toaster position="top-center" richColors  />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPass />} />
            <Route path="/jurusan" element={<Jurusan />} />
            <Route path="/biaya" element={<Biaya />} />
            <Route path='/profile' element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>} />
            <Route path='/berkas' element={
              <BerkasRoutes>
                <ProtectedRoutes> 
                  <DataDiri />
                </ProtectedRoutes>
              </BerkasRoutes> 
              } />
            <Route path='/berkas/data-orang-tua' element={<ProtectedRoutes> <DataOrangTua /> </ProtectedRoutes>} />
            <Route path='/berkas/success' element={<SuccessPage />} />
            <Route path='/berkas/alreadyinput' element={<AlreadyInputPage />} />
            <Route path='/pembayaran' element={<ProtectedRoutes> <Pembayaran /> </ProtectedRoutes>} />
            <Route path='/test' element={<SuccessPage />} />
            <Route path="*" element={<ErrorPage />} />  
          </Routes>
        </main>
        {shouldRenderHeaderFooter && <Footer />}
      </QueryClientProvider>
    </>
  )
}

export default LandingPage
