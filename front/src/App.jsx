import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Display from "./pages/Display";
import Form from "./pages/Form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
