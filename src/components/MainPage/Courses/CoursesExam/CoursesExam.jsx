import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoursesExam.css';


export default function CoursesExam() {
  const location = useLocation();
  const navigate = useNavigate();

  const courseId = location.state?.courseId;

  const [courseDetail, setCourseDetail] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseAndTests = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch course detail
        const { data: course } = await axios.get(`https://www.srv620732.hstgr.cloud/courses/getcoursebyid/${courseId}`);
        setCourseDetail(course);

        // Fetch all tests for this course
        const { data: testList } = await axios.get(`https://www.srv620732.hstgr.cloud/fetch/alltestInCourse/${courseId}`);
        setTests(testList);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseAndTests();
    } else {
      setError(new Error('No course ID provided.'));
      setLoading(false);
    }
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="courses-exam-container">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Go Back</button>

      {/* Course Detail Section */}
      <div className="courses-exam-header">
        <img
          src={courseDetail?.image || location.state?.courseImage || t4_0}
          alt={courseDetail?.name || 'Course'}
          className="courses-exam-image"
        />
        <div className="courses-exam-header-content">
          <h2 className="courses-exam-title">{courseDetail?.name}</h2>
          <p className="courses-exam-description">{courseDetail?.description}</p>
          <div className="courses-exam-tags">
            {courseDetail?.tags?.map((tag, i) => (
              <span className="courses-exam-tag" key={i}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Test Section */}
      <h4 className="related-courses-title">All Tests in this Course</h4>
      <div className="related-courses-grid">
        {tests.length === 0 && <div>No tests found for this course.</div>}
        {tests.map((test, i) => (
          <div className="related-course-card" key={test.id || i}>
            <div className="related-course-card-header">
              <span className="related-course-duration">{test.duration || 'N/A'}</span>
            </div>
            <div className="related-course-card-body">
              <div className="related-course-info">
                <h5 className="related-course-title">{test.name}</h5>
                <ul className="related-course-features">
                  <li>Type: {test.type}</li>
                  <li>Max Marks: {test.maxMarks}</li>
                  {/* Add more test details as needed */}
                </ul>
              </div>
            </div>
            {/* Add a button or link if you want to start the test */}
          </div>
        ))}
      </div>
    </div>
  );
}