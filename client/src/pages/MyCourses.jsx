import { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5006/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">My Courses</h2>

      {courses.length === 0 ? (
        <p className="empty-text">You have not subscribed to any courses yet.</p>
      ) : (
        <div className="course-grid">
          {courses.map((item) => (
            <div className="course-card" key={item._id}>
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
                Subscribed on{" "}
                {new Date(item.subscribedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
