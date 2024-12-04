import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login.jsx";
import Register from "../src/components/Register.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddUser from "./pages/AddUser.jsx";
import UpdateUser from "./pages/UpdateUser.jsx"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/add-user" element={<AddUser />} />

        <Route path="/update-user/:id" element={<UpdateUser />} />

      </Routes>
    </Router>
  )
}

export default App;
