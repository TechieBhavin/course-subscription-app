import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [promoCode, setPromoCode] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5006/courses/${id}`).then((res) => {
      setCourse(res.data);
    });
  }, [id]);

  const subscribe = async () => {
    try {
      await axios.post(
        "http://localhost:5006/subscribe",
        {
          courseId: id,
          promoCode: promoCode || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Subscribed successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.price === 0 ? "FREE" : `₹${course.price}`}</p>

      {course.price > 0 && (
        <input
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      )}
      <br /><br />
      <button onClick={subscribe}>Subscribe</button>
    </div>
  );
};

export default CourseDetail;
