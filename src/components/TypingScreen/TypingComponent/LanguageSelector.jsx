import React from "react";
import { Form } from "react-bootstrap";

// Component for selecting the typing language
const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <Form.Select
      value={language}
      onChange={(e) => setLanguage(e.target.value)} // Update the selected language
      className="w-50 mx-auto"
    >
      <option value="english">English</option>
      <option value="hindi">Hindi</option>
    </Form.Select>
  );
};

export default LanguageSelector;