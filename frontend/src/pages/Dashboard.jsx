
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../services/api";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch((error) => console.log("Loading error:", error))
      .finally(() => setLoading(false));
  }, []);

  const ready = students.filter(
    (student) => student.placementReadiness === "Ready"
  ).length;

  const average = students.length
    ? Math.round(
        students.reduce((total, s) => total + Number(s.aptitudeScore || 0), 0) /
          students.length
      )
    : 0;

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW / DASHBOARD</p>
          <h1>Welcome to SkillConnect</h1>
          <p>Track student skills and monitor placement readiness.</p>
        </div>
        <Link to="/add" className="primary-btn">+ Add Student</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card purple">
          <span>Total Students</span>
          <h2>{loading ? "..." : students.length}</h2>
          <small>Registered students</small>
        </div>

        <div className="stat-card green">
          <span>Placement Ready</span>
          <h2>{loading ? "..." : ready}</h2>
          <small>Students ready for placement</small>
        </div>

        <div className="stat-card orange">
          <span>Not Ready</span>
          <h2>{loading ? "..." : students.length - ready}</h2>
          <small>Need more preparation</small>
        </div>

        <div className="stat-card blue">
          <span>Average Aptitude</span>
          <h2>{loading ? "..." : `${average}%`}</h2>
          <small>Overall aptitude score</small>
        </div>
      </div>

      <div className="content-card">
        <div className="section-heading">
          <div>
            <h2>Recently Added Students</h2>
            <p>Latest student records from the database</p>
          </div>
          <Link to="/students">View all →</Link>
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found. Add your first student.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Register Number</th>
                  <th>Department</th>
                  <th>Aptitude</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.registerNumber}</td>
                    <td>{student.department}</td>
                    <td>{student.aptitudeScore}%</td>
                    <td>
                      <span className={`status ${student.placementReadiness === "Ready" ? "ready" : "not-ready"}`}>
                        {student.placementReadiness}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
