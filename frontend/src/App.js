/**
 * Project: AnimalRescue
 * File: App.js
 * Author: Jarrale Butts
 * Created: 2024-09-16
 * Purpose: Main component that wraps all other components and handles routing.
 */

import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";  // Allows nested routes to render components
import Header from "./uiComponents/Header";
import Footer from "./uiComponents/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      {/* Render the header */}
      <Header />
      <main className='py-3'>
        <Container>
          {/* Render the current route's component */}
          <Outlet />
        </Container>
      </main>
      {/* Render the footer */}
      <Footer />
    </>
  );
};

export default App;