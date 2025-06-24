import Form from "./pages/Form";
import "./App.css";
import Display from "./pages/Display";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/form/:id" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
