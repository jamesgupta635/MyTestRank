import React, { useRef, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const TypingCard = ({ language, sentence, inputText, handleInput, resetTest, timeUp, isTyping, onSubmitTest }) => {
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
                     <div className="d-flex justify-content-between align-items-center mb-4">
             <h3 className="text-primary fw-bold mb-0">
               Typing Test ({language.toUpperCase()})
             </h3>
             {isTyping && !timeUp && (
               <div className="d-flex align-items-center">
                 <div className="spinner-border spinner-border-sm text-success me-2" role="status">
                   <span className="visually-hidden">Loading...</span>
                 </div>
                 <span className="text-success fw-bold">Test in Progress</span>
               </div>
             )}
           </div>

          <div className="test-content">
            <div className="test-content-text">
              {sentence.map((char, index) => (
                <span
                  key={index}
                  style={{
                    color:
                      index < inputText.length
                        ? inputText[index] === char
                          ? "#28a745"
                          : "#dc3545"
                        : "#495057",
                    fontWeight: index === inputText.length ? "bold" : "normal",
                    textDecoration: index === inputText.length ? "underline" : "none",
                    backgroundColor: index === inputText.length ? "#fff3cd" : "transparent",
                    padding: index === inputText.length ? "2px 1px" : "0",
                    borderRadius: index === inputText.length ? "3px" : "0",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          <Form.Control
            type="text"
            className="mb-3 kruti-dev typing-input"
            value={inputText}
            onChange={(e) => handleInput(e.target.value)}
            autoFocus
            disabled={timeUp}
            placeholder={language === "english" ? "Start typing..." : "टाइप करना शुरू करें..."}
          />

          <div className="d-grid gap-2">
            {isTyping && !timeUp ? (
              <Button
                onClick={onSubmitTest}
                variant="success"
                size="lg"
                style={{
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                <i className="fas fa-check me-2"></i>
                Submit Test
              </Button>
            ) : (
              <Button
                onClick={resetTest}
                variant="primary"
                size="lg"
                style={{
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                <i className="fas fa-redo me-2"></i>
                Try Again
              </Button>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TypingCard;
