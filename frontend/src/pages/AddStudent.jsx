
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../services/api";

function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    registerNumber: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    placementReadiness: "Not Ready"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStudent({
        ...form,
        aptitudeScore: Number(form.aptitudeScore)
      });

      alert("Student added successfully!");
      navigate("/students");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to add student");
    }
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT / NEW RECORD</p>
          <h1>Add New Student</h1>
          <p>Enter student details and placement skills.</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Student Information</h2>
        <p className="form-description">Fill in the details below.</p>

        {message && <p className="error-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Student Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </label>

            <label>
              Register Number
              <input
                name="registerNumber"
                value={form.registerNumber}
                onChange={handleChange}
                placeholder="Enter register number"
                required
              />
            </label>

            <label>
              Department
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Example: Information Technology"
                required
              />
            </label>

            <label>
              Technical Skills
              <input
                name="technicalSkills"
                value={form.technicalSkills}
                onChange={handleChange}
                placeholder="Python, Java, React..."
              />
            </label>

            <label>
              Aptitude Score (0-100)
              <input
                type="number"
                name="aptitudeScore"
                value={form.aptitudeScore}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="Enter score"
                required
              />
            </label>

            <label>
              Communication Skills
              <select
                name="communicationSkills"
                value={form.communicationSkills}
                onChange={handleChange}
                required
              >
                <option value="">Select level</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Needs Improvement">Needs Improvement</option>
              </select>
            </label>

            <label>
              Placement Readiness
              <select
                name="placementReadiness"
                value={form.placementReadiness}
                onChange={handleChange}
              >
                <option value="Ready">Ready</option>
                <option value="Not Ready">Not Ready</option>
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
