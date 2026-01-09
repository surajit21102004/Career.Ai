import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../src/pages/Landing';
import Navbar from '../src/component/Navbar';
import Footer from '../src/component/Footer';
import About from '../src/pages/About';
import BookASession from '../src/pages/book';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./component/ScrollToTop";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
         <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/BookASession" element={<BookASession />} />
          {/* You can add more routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
