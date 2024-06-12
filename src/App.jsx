import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/index";

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/dictionary_add/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
