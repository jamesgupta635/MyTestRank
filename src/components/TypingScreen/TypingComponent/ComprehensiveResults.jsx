import React from "react";

const ComprehensiveResults = ({ stats }) => {
  if (!stats) return null;
  return (
    <div className="comprehensive-results bg-white rounded p-4 shadow-lg">
      <h4 className="text-center text-primary mb-4">Test Results</h4>
      <div className="results-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="result-item">
            <span className="result-label">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
            </span>
            <span className="result-value">
              {typeof value === "number" && key.includes("Time") ? `${value.toFixed(2)}s` : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComprehensiveResults;