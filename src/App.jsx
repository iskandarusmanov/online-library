import React from 'react'
import Login from './components/pages/auth/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/pages/auth/Register';
import AuthLayout from './components/layouts/AuthLayout';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './components/pages/home';
import { useSelector } from 'react-redux';
import MyLibrary from './components/pages/myLibrary';


export default function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userData = useSelector((state) => state.user.data);

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<AuthLayout />}> 
          <Route index element={<Navigate to="/login " />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>    
    );
  }

  return (
    <Routes>
        <Route path="/" element={<MainLayout />}> 
          <Route index path="/" element={<HomePage />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes> 
  )
}
