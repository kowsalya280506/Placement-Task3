
import { useEffect, useState } from "react";
import {
  getStudents,
  updateStudent,
  deleteStudent
} from "../services/api";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      alert("Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id);
      setStudents((previous) => previous.filter((s) => s._id !== id));
      alert("Student deleted successfully");
    } catch (error) {
      alert("Delete failed");
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setEditForm({
      name: student.name,
      registerNumber: student.registerNumber,
      department: student.department,
      technicalSkills: student.technicalSkills || "",
      aptitudeScore: student.aptitudeScore,
      communicationSkills: student.communicationSkills || "",
      placementReadiness: student.placementReadiness
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateStudent(editingId, {
        ...editForm,
        aptitudeScore: Number(editForm.aptitudeScore)
      });

      setStudents((previous) =>
        previous.map((s) =>
          s._id === editingId ? response.data.student : s
        )
      );

      setEditingId(null);
      alert("Student updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT / DIRECTORY</p>
          <h1>Student Directory</h1>
          <p>View and manage all registered student records.</p>
        </div>
        <span className="record-count">{students.length} Students</span>
      </div>

      {editingId && (
        <div className="form-card edit-card">
          <h2>Edit Student Details</h2>

          <form onSubmit={handleUpdate}>
            <div className="form-grid">
              {[
                ["name", "Student Name"],
                ["registerNumber", "Register Number"],
                ["department", "Department"],
                ["technicalSkills", "Technical Skills"],
                ["aptitudeScore", "Aptitude Score"],
                ["communicationSkills", "Communication Skills"]
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    type={key === "aptitudeScore" ? "number" : "text"}
                    min={key === "aptitudeScore" ? 0 : undefined}
                    max={key === "aptitudeScore" ? 100 : undefined}
                    value={editForm[key] ?? ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [key]: e.target.value })
                    }
                    required={key === "name" || key === "registerNumber" || key === "department"}
                  />
                </label>
              ))}

              <label>
                Placement Readiness
                <select
                  value={editForm.placementReadiness}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      placementReadiness: e.target.value
                    })
                  }
                >
                  <option value="Ready">Ready</option>
                  <option value="Not Ready">Not Ready</option>
                </select>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Update Student
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="content-card">
        <div className="section-heading">
          <div>
            <h2>All Students</h2>
            <p>Student skill and placement information</p>
          </div>
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No student records available.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Register No.</th>
                  <th>Department</th>
                  <th>Technical Skills</th>
                  <th>Aptitude</th>
                  <th>Communication</th>
                  <th>Readiness</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.registerNumber}</td>
                    <td>{student.department}</td>
                    <td>{student.technicalSkills || "-"}</td>
                    <td>{student.aptitudeScore}%</td>
                    <td>{student.communicationSkills || "-"}</td>
                    <td>
                      <span className={`status ${student.placementReadiness === "Ready" ? "ready" : "not-ready"}`}>
                        {student.placementReadiness}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => startEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default StudentList;
