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
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>My Courses</h2>

      {courses.map((item) => (
        <div key={item._id}>
          <h3>{item.courseId.title}</h3>
          <p>Price Paid: ₹{item.pricePaid}</p>
          <p>
            Subscribed At:{" "}
            {new Date(item.subscribedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
