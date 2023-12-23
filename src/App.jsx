import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import StudentRoute from "./routes/StudentRoute";
import AdminRoute from "./routes/AdminRoute";
import InstructorRoute from "./routes/InstructorRoute";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<StudentRoute />} />
        <Route path='/admin/*' element={<AdminRoute/>}/>
        <Route path='/instructor/*' element={<InstructorRoute/>}/>
      </Routes>
    </Router>
  );
}

export default App;
