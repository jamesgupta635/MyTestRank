import React from "react";
import { Modal, Button } from "react-bootstrap";

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

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Test Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <strong>Test:</strong> {testData?.title}
          <br />
          <strong>Course:</strong> {courseData?.name}
        </div>
        <hr />
        <ul>
          {Object.entries(results).map(([key, value]) => (
            <li key={key}>
              <strong>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </strong>{" "}
              {typeof value === "number" && key.includes("Time")
                ? `${value.toFixed(2)}s`
                : value}
            </li>
          ))}
        </ul>
      </Modal.Body>
             <Modal.Footer>
         <Button variant="primary" onClick={onRetry}>
           Try Again
         </Button>
         <Button variant="secondary" onClick={onBackToTests}>
           Back to Tests
         </Button>
       </Modal.Footer>
    </Modal>
  );
};

export default TestResultsPopup;