import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";  // Allows nested routes to render components
import Header from "./uiComponents/Header";
import Footer from "./uiComponents/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main application component that sets up the layout of the application.
const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};
export default App;