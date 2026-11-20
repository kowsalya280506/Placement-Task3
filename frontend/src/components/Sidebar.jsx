
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">S</div>
        <div>
          <h2>SkillConnect</h2>
          <small>PLACEMENT PORTAL</small>
        </div>
      </div>

      <p className="menu-title">WORKSPACE</p>

      <nav>
        <Link to="/">▦ Dashboard</Link>
        <Link to="/add">＋ Add Student</Link>
        <Link to="/students">☷ Student Directory</Link>
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-circle">A</div>
        <div>
          <strong>Administrator</strong>
          <small>Placement Coordinator</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
