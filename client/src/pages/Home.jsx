import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5006/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h2>All Courses</h2>
        <Link className="nav-link" to="/my-courses">
          My Courses
        </Link>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <div className="card-header">
              <h3>{course.title}</h3>
              <span
                className={`price-badge ${
                  course.price === 0 ? "free" : "paid"
                }`}
              >
                {course.price === 0 ? "FREE" : `₹${course.price}`}
              </span>
            </div>

            <p>{course.description}</p>

            <div className="card-actions">
              <Link to={`/courses/${course._id}`}>View Details →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
