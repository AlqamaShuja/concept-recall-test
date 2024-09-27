import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { public_routes } from './route_constant';
import MainLayout from '../Components/Layout/Layout';


const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {public_routes?.map(({ path, Component, }) => (
            <Route key={path} path={path} element={<MainLayout><Component /></MainLayout>} />
        ))}
      </Routes>
    </Router>
  );
};

export default AllRoutes;
