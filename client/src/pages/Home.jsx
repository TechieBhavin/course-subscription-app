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
    <div style={{ padding: 40 }}>
      <h2>All Courses</h2>
      <Link to="/my-courses">My Courses</Link>
      <hr />

      {courses.map((course) => (
        <div key={course._id} style={{ marginBottom: 20 }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>
            {course.price === 0 ? "FREE" : `₹${course.price}`}
          </p>
          <Link to={`/courses/${course._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
