import React from "react";
import { Modal, Button, Badge, Row, Col } from "react-bootstrap";
import "./TestResultsPopup.css";

const TestResultsPopup = ({
  show,
  onHide,
  results,
  testData,
  courseData,
  onRetry,
  onBackToTests,
  isTyping,
  testCompleted,
}) => {
  if (!results) return null;

  const formatValue = (key, value) => {
    if (typeof value === "number") {
      if (key.includes("Time")) return `${value.toFixed(2)}s`;
      if (key.includes("Percentage")) return `${value}%`;
      if (key.includes("Speed")) return `${value} WPM`;
      if (key.includes("Accuracy")) return `${value}%`;
      return value.toString();
    }
    return value;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Time Up': return 'warning';
      case 'In Progress': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return '✅';
      case 'Time Up': return '⏰';
      case 'In Progress': return '🔄';
      default: return '📊';
    }
  };

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`);
  };

  const getCategory = (key) => {
    if (key.includes('Time') || key.includes('Duration')) return 'time';
    if (key.includes('Speed') || key.includes('WPM') || key.includes('CPM')) return 'speed';
    if (key.includes('Accuracy') || key.includes('Error') || key.includes('Mistake')) return 'accuracy';
    if (key.includes('Word') || key.includes('Key')) return 'words';
    if (key.includes('Status')) return 'status';
    return 'general';
  };

  const categories = {
    status: ['status'],
    time: ['timeTaken', 'duration'],
    speed: ['grossSpeed', 'netSpeed', 'wpm', 'cpm'],
    accuracy: ['accuracy', 'errorPercentage', 'mistakes'],
    words: ['totalWords', 'wordsTyped', 'correctWords', 'totalKeyStrokes', 'typedKeyStrokes'],
    general: ['backspacePressed', 'halfErrorKeyStrokes', 'leftoutKeyStrokes']
  };

  const renderCategory = (categoryName, keys) => {
    const categoryKeys = keys.filter(key => results.hasOwnProperty(key));
    if (categoryKeys.length === 0) return null;

    return (
      <div key={categoryName} className="results-category">
        <h6 className="category-title">{categoryName.toUpperCase()}</h6>
        <Row className="g-2">
          {categoryKeys.map(key => (
            <Col xs={12} sm={6} key={key}>
              <div className="result-card">
                <div className="result-label">{formatKey(key)}</div>
                <div className="result-value">
                  {key === 'status' ? (
                    <Badge bg={getStatusColor(results[key])} className="status-badge">
                      {getStatusIcon(results[key])} {results[key]}
                    </Badge>
                  ) : (
                    formatValue(key, results[key])
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="lg"
      className="results-popup-modal"
      backdrop="static"
    >
      <Modal.Header className="results-header">
        <Modal.Title className="results-title">
          <div className="title-content">
            <div className="title-icon">🏆</div>
            <div className="title-text">
              <h3 className="mb-1">Test Results</h3>
              <p className="mb-0 text-muted">Your typing performance summary</p>
            </div>
          </div>
        </Modal.Title>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={onHide}
          aria-label="Close"
        />
      </Modal.Header>

      <Modal.Body className="results-body">
        <div className="test-info-section">
          <Row className="g-3 mb-4">
            <Col xs={12} md={6}>
              <div className="info-card">
                <div className="info-icon">📝</div>
                <div className="info-content">
                  <h6 className="info-label">Test</h6>
                  <p className="info-value">{testData?.title || 'N/A'}</p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="info-card">
                <div className="info-icon">📚</div>
                <div className="info-content">
                  <h6 className="info-label">Course</h6>
                  <p className="info-value">{courseData?.name || 'N/A'}</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="results-content">
          {Object.entries(categories).map(([categoryName, keys]) => 
            renderCategory(categoryName, keys)
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="results-footer">
        <div className="footer-actions">
          <Button 
            variant="outline-primary" 
            onClick={onRetry}
            className="action-btn retry-btn"
            size="lg"
          >
            <span className="btn-icon">🔄</span>
            Try Again
          </Button>
          <Button 
            variant="primary" 
            onClick={onBackToTests}
            className="action-btn back-btn"
            size="lg"
          >
            <span className="btn-icon">←</span>
            Back to Tests
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TestResultsPopup;