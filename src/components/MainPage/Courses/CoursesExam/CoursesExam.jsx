import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../../utils/api';
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
        const { data: course } = await axiosInstance.get(`/courses/getcoursebyid/${courseId}`);
        setCourseDetail(course);

        // Fetch all tests for this course
        const { data: testList } = await axiosInstance.get(`/fetch/alltestInCourse/${courseId}`);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return originalPrice - (originalPrice * discountPercentage / 100);
  };

  if (loading) {
    return (
      <div className="courses-exam-container">
        <div className="tests-loading-container">
          <div className="tests-loading-spinner"></div>
          <p>Loading course and tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-exam-container">
        <div className="tests-error-container">
          <p className="tests-error-message">Error: {error.message}</p>
          <button className="back-btn" onClick={() => navigate(-1)}>&larr; Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-exam-container">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Go Back</button>

      {/* Course Detail Section */}
      <div className="courses-exam-header">
        <img
          src={courseDetail?.imageUrl || location.state?.courseImage}
          alt={courseDetail?.name || 'Course'}
          className="courses-exam-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/130x130?text=Course+Image';
          }}
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

      {/* Tests Section */}
      <div className="all-tests-container">
        <div className="all-tests-header">
          <h1 className="all-tests-title">Tests in {courseDetail?.name}</h1>
          <p className="all-tests-subtitle">
            Available tests for this course
          </p>
          <div className="all-tests-stats">
            <span className="stat-item">
              <strong>{tests.length}</strong> Total Tests
            </span>
          </div>
        </div>

        {tests.length === 0 ? (
          <div className="tests-empty-container">
            <div className="empty-icon">📝</div>
            <h3>No Tests Available</h3>
            <p>This course doesn't have any tests yet.</p>
          </div>
        ) : (
          <div className="all-tests-grid">
            {tests.map((test) => (
              <div className="test-card" key={test.id}>
                <div className="test-card-header">
                  <div className="test-image-container">
                    <img 
                      src={test.imageUrl} 
                      alt={test.title} 
                      className="test-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Test+Image';
                      }}
                    />
                    <div className="test-type-badge">{test.type}</div>
                    {test.discountPercentage > 0 && (
                      <div className="test-discount-badge">
                        {test.discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="test-card-body">
                  <h3 className="test-title">{test.title}</h3>
                  <p className="test-description">{test.description}</p>
                  
                  <div className="test-details">
                    <div className="test-detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{test.durationInMinutes} min</span>
                    </div>
                    <div className="test-detail-item">
                      <span className="detail-label">Language:</span>
                      <span className="detail-value">{test.language}</span>
                    </div>
                    <div className="test-detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{test.date}</span>
                    </div>
                  </div>

                  {test.contain && (
                    <div className="test-content-preview">
                      <p className="content-text">{test.contain}</p>
                    </div>
                  )}

                  <div className="test-pricing">
                    {test.discountPercentage > 0 ? (
                      <>
                        <div className="test-original-price">
                          <span className="currency">₹</span>
                          <span className="amount">{test.price}</span>
                        </div>
                        <div className="test-discounted-price">
                          <span className="currency">₹</span>
                          <span className="amount">{calculateDiscountedPrice(test.price, test.discountPercentage).toFixed(0)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="test-price">
                        <span className="currency">₹</span>
                        <span className="amount">{test.price}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="test-card-footer">
                  <button 
                    className="test-start-btn"
                    onClick={() => navigate('/test', {
                      state: {
                        testData: test,
                        courseData: courseDetail
                      }
                    })}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}