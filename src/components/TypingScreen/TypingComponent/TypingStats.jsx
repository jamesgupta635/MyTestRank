import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Component for displaying typing stats
const TypingStats = ({ timeLeft, mistakes, wpm, cpm, accuracy }) => {
  return (
    <Card className="p-3 shadow-lg bg-white text-center rounded">
      <Row>
        <Col>
          <h5 className="text-secondary">Time Left</h5>
          <p className="text-primary fw-bold">{timeLeft}s</p>
        </Col>

        <Col>
          <h5 className="text-secondary">Mistakes</h5>
          <p className="text-danger fw-bold">{mistakes}</p>
        </Col>

        <Col>
          <h5 className="text-secondary">WPM</h5>
          <p className="text-success fw-bold">{wpm}</p>
        </Col>

        <Col>
          <h5 className="text-secondary">CPM</h5>
          <p className="text-info fw-bold">{cpm}</p>
        </Col>

        {/* Only show accuracy when time is up */}
        {timeLeft === 0 && (
          <Col>
            <h5 className="text-secondary">Accuracy</h5>
            <p className="text-warning fw-bold">{accuracy}%</p>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default TypingStats;
