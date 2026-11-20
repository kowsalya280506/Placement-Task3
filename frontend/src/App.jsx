
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-area">
          <header className="topbar">
            <span>Placement Skill Monitoring System</span>
            <span className="topbar-tag">ADMIN PANEL</span>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
