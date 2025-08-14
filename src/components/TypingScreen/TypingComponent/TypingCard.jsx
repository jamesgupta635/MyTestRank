import React, { useRef, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const TypingCard = ({ language, sentence, inputText, handleInput, resetTest, timeUp }) => {
  const inputRef = useRef(null);

  // Adjust input height based on content
  const adjustInputHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  // Adjust height after mounting and when input changes
  useEffect(() => {
    adjustInputHeight();
  }, [inputText]);

  return (
    <Row className="justify-content-center">
      <Col xs={12}>
        <Card
          className="p-4 shadow-lg bg-white text-center border-0"
          style={{
            borderRadius: "20px",
          }}
        >
          <h3 className="mb-4 text-primary fw-bold text-center">
            Typing Test ({language.toUpperCase()})
          </h3>

          <Card.Text
            className="text-dark text-start mb-3 mx-auto"
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "18px",
              lineHeight: "1.8",
              padding: "12px 16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              border: "1px solid #dee2e6",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {sentence.map((char, index) => (
              <span
                key={index}
                style={{
                  color:
                    index < inputText.length
                      ? inputText[index] === char
                        ? "#28a745"
                        : "#dc3545"
                      : "#212529",
                  fontWeight: index === inputText.length ? "bold" : "normal",
                  textDecoration: index === inputText.length ? "underline" : "none",
                }}
              >
                {char}
              </span>
            ))}
          </Card.Text>

          <Form.Control
            type="text"
            className="mb-3 kruti-dev"
            value={inputText}
            onChange={(e) => handleInput(e.target.value)}
            autoFocus
            disabled={timeUp}
            placeholder={language === "english" ? "Start typing..." : "टाइप करना शुरू करें..."}
            style={{
              fontSize: "16px",
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />

          <div className="d-grid">
            <Button
              onClick={resetTest}
              variant="primary"
              size="lg"
              style={{
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Try Again
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TypingCard;
