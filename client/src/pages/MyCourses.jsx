import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5006/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2 className="page-title">My Courses</h2>

      <button onClick={handleLogout}>Logout</button>

      {courses.length === 0 ? (
        <p className="empty-text">
          You have not subscribed to any courses yet.
        </p>
      ) : (
        <div className="course-grid">
          {courses.map((item) => (
            <div className="course-card" key={item._id}>
              <img
                src={item.courseId.thumbnail}
                alt={item.courseId.title}
                className="course-thumbnail"
              />
              <div className="card-header">
                <h3>{item.courseId.title}</h3>
                <span
                  className={`price-badge ${
                    item.pricePaid === 0 ? "free" : "paid"
                  }`}
                >
                  {item.pricePaid === 0 ? "FREE" : `₹${item.pricePaid}`}
                </span>
              </div>

              <p className="subscribed-date">
                Subscribed on {new Date(item.subscribedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
