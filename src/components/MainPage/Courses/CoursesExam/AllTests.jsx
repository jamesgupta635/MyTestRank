import React, { useState, useEffect } from 'react';
import { get } from '../../../../utils/api';
import './CoursesExam.css';

export default function AllTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    fetchTests(currentPage);
  }, [currentPage]);

  const fetchTests = async (page) => {
    try {
      setLoading(true);
      const data = await get(`/fetch/alltests?page=${page}&size=${pageSize}`);
      setTests(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return originalPrice - (originalPrice * discountPercentage / 100);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="pagination-btn prev-btn"
      >
        ← Previous
      </button>
    );

    // First page
    if (startPage > 0) {
      pages.push(
        <button
          key="first"
          onClick={() => handlePageChange(0)}
          className="pagination-btn"
        >
          1
        </button>
      );
      if (startPage > 1) {
        pages.push(<span key="dots1" className="pagination-dots">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i + 1}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(<span key="dots2" className="pagination-dots">...</span>);
      }
      pages.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages - 1)}
          className="pagination-btn"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="pagination-btn next-btn"
      >
        Next →
      </button>
    );

    return pages;
  };

  if (loading) {
    return (
      <div className="all-tests-container">
        <div className="tests-loading-container">
          <div className="tests-loading-spinner"></div>
          <p>Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-tests-container">
        <div className="tests-error-container">
          <p className="tests-error-message">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-tests-container">
      <div className="all-tests-header">
        <h1 className="all-tests-title">All Available Tests</h1>
        <p className="all-tests-subtitle">
          Discover and take tests to improve your skills
        </p>
        <div className="all-tests-stats">
          <span className="stat-item">
            <strong>{totalElements}</strong> Total Tests
          </span>
          <span className="stat-item">
            <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong> Pages
          </span>
        </div>
      </div>

      {tests.length === 0 ? (
        <div className="tests-empty-container">
          <div className="empty-icon">📝</div>
          <h3>No Tests Available</h3>
          <p>Check back later for new tests!</p>
        </div>
      ) : (
        <>
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

                   <div className="test-content-preview">
                     <p className="content-text">{test.contain}</p>
                   </div>

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
                  <button className="test-start-btn">
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} tests
              </div>
              <div className="pagination-controls">
                {renderPagination()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 