import React from "react";
import { ToastContainer } from 'react-toastify';
import "./App.scss";
import HomePage from "./pages/home-page.component";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <HomePage />
      <ToastContainer 
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover  
      />
    </div>
  );
}

export default App;
