import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Courses.css";
import { getAllCourses } from '../../../ApiCall/mainPageLoader';

const Courses = () => {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        setCoursesData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Pass both the name AND the image URL
  const handleCourseClick = (courseItem) => {
    navigate('/coursesExam', {
      state: {
        courseId: courseItem.id,
        courseName: courseItem.name,
        courseImage: courseItem.image // Pass the image URL
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        Error loading courses: {error.message}
      </div>
    );
  }

  return (
    <section id="all-courses-section" className="course-grid-section py-5">
      <div className="container-fluid">
        <h2 className="course-grid-title text-center mb-4">
          All <span className="course-grid-highlight">Courses</span>
        </h2>
        <div className="row course-grid-row justify-content-center">
          {(Array.isArray(coursesData) ? coursesData : []).map((course, idx) => (
            <div
              className="course-grid-card mb-4"
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => handleCourseClick(course)}
            >
              <img
                src={course.imageUrl}
                alt={course.name}
                className="course-grid-img img-fluid mb-2"
              />
              <div className="course-grid-name">{course.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;