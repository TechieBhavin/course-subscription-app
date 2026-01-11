import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import Signup from "./pages/Signup";

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/courses/:id"
        element={
          isAuthenticated() ? <CourseDetail /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/my-courses"
        element={isAuthenticated() ? <MyCourses /> : <Navigate to="/login" />}
      />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
