import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Component for displaying typing stats
const TypingStats = ({ timeLeft, mistakes, wpm, cpm, accuracy, totalKeyStrokes, backspacePressed }) => {
  return (
    <Card className="p-3 shadow-lg bg-white text-center rounded">
      <Row>
        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">Time Left</h6>
          <p className="text-primary fw-bold mb-0">{timeLeft}s</p>
        </Col>

        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">WPM</h6>
          <p className="text-success fw-bold mb-0">{wpm}</p>
        </Col>

        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">CPM</h6>
          <p className="text-info fw-bold mb-0">{cpm}</p>
        </Col>

        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">Accuracy</h6>
          <p className="text-warning fw-bold mb-0">{accuracy}%</p>
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">Mistakes</h6>
          <p className="text-danger fw-bold mb-0">{mistakes}</p>
        </Col>

        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">Key Strokes</h6>
          <p className="text-dark fw-bold mb-0">{totalKeyStrokes || 0}</p>
        </Col>

        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">Backspace</h6>
          <p className="text-secondary fw-bold mb-0">{backspacePressed || 0}</p>
        </Col>

        <Col xs={6} sm={3}>
          <h6 className="text-secondary mb-1">Status</h6>
          <p className={`fw-bold mb-0 ${timeLeft === 0 ? 'text-danger' : 'text-success'}`}>
            {timeLeft === 0 ? 'Time Up' : 'Active'}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default TypingStats;
