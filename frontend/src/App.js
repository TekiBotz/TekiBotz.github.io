import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";  // Connects the router from index.js
import Header from "./uiComponents/Header";
import Footer from "./uiComponents/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py=3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};
export default App