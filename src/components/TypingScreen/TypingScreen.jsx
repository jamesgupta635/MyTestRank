import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import TypingCard from "./TypingComponent/TypingCard";
import TypingStats from "./TypingComponent/TypingStats";
import LanguageSelector from "./TypingComponent/LanguageSelector";
import TestResultsPopup from "./TypingComponent/TestResultsPopup";
import ComprehensiveResults from "./TypingComponent/ComprehensiveResults";
import { krutiDevMap } from "./engine/krutiDevMap";
import "bootstrap/dist/css/bootstrap.min.css";
import './TypingScreen.css';

// Sample text for English and Hindi (fallback)
const textSamples = {
  english: "The quick brown fox jumps over the lazy dog. A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
  hindi: "तेज़ भूरी लोमड़ी आलसी कुत्ते के ऊपर कूदती है।  अनुच्छेद लेखन एक विषय पर संक्षिप्त, स्पष्ट और संगठित रूप से विचार प्रस्तुत करने की कला है। इसमें प्रवाह और तार्किक क्रम बना रहना चाहिए ताकि पाठक विषय को आसानी से समझ सके।",
};

const TypingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get test data from navigation state
  const testData = location.state?.testData;
  const courseData = location.state?.courseData;
  
  // If no test data is provided, show a message or redirect
  if (!testData) {
    return (
      <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="text-center">
          <h3 className="text-muted mb-3">No Test Selected</h3>
          <p className="text-muted mb-4">Please select a test from the course page to start typing.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/coursesExam')}
          >
            Go to Courses
          </button>
        </div>
      </Container>
    );
  }
  
  // Determine the text to use for typing
  const getTypingText = () => {
    if (testData?.contain) {
      return testData.contain;
    } else if (testData?.description) {
      return testData.description;
    } else {
      return textSamples.english; // Fallback to default text
    }
  };

  // State variables for managing the typing test
  const [language, setLanguage] = useState("english"); // Current language
  const [sentence, setSentence] = useState(getTypingText().split("")); // Sentence to type
  const [inputText, setInputText] = useState(""); // User's input
  const [currIndex, setCurrIndex] = useState(0); // Current index in the sentence
  const [mistakes, setMistakes] = useState(0); // Mistakes count
  const [timeLeft, setTimeLeft] = useState(testData?.durationInMinutes ? testData.durationInMinutes * 60 : 60); // Time left for the test
  const [wpm, setWpm] = useState(0); // Words per minute
  const [cpm, setCpm] = useState(0); // Characters per minute
  const [accuracy, setAccuracy] = useState(100); // Typing accuracy
  const [isTyping, setIsTyping] = useState(false); // Whether the user is typing
  const [timeUp, setTimeUp] = useState(false); // Whether the time is up
  const [testCompleted, setTestCompleted] = useState(false); // Whether the test is completed
  const [testStartTime, setTestStartTime] = useState(null); // Test start time
  const [testEndTime, setTestEndTime] = useState(null); // Test end time
  const [showResultsPopup, setShowResultsPopup] = useState(false); // Whether to show results popup
  const [finalResults, setFinalResults] = useState(null); // Final test results

  // Refs for tracking typing progress
  const correctCharCount = useRef(0); // Correctly typed characters
  const totalTypedChars = useRef(0); // Total typed characters
  const backspaceCount = useRef(0); // Backspace key presses
  const totalKeyStrokes = useRef(0); // Total key strokes
  const timerRef = useRef(null); // Timer reference
  const correctnessArray = useRef([]); // Array to track correctness of each character
  const wordArray = useRef([]); // Array to track words typed
  const correctWords = useRef(0); // Correctly typed words

  // Effect to reset the test when the language changes
  useEffect(() => {
    if (language === "hindi") {
      setSentence(textSamples.hindi.split(""));
    } else {
      setSentence(getTypingText().split(""));
    }
    resetTest();
  }, [language]);

  // Function to reset the test
  const resetTest = () => {
    setInputText(""); // Clear the input text
    setCurrIndex(0); // Reset the current index
    setMistakes(0); // Reset the mistakes count
    setTimeLeft(testData?.durationInMinutes ? testData.durationInMinutes * 60 : 60); // Reset the timer to test duration
    setWpm(0); // Reset words per minute
    setCpm(0); // Reset characters per minute
    setAccuracy(100); // Reset accuracy
    setIsTyping(false); // Reset typing state
    setTimeUp(false); // Reset time-up state
    setTestCompleted(false); // Reset test completion state
    setTestStartTime(null); // Reset test start time
    setTestEndTime(null); // Reset test end time
    setShowResultsPopup(false); // Reset results popup state
    setFinalResults(null); // Reset final results
    correctCharCount.current = 0; // Reset correct character count
    totalTypedChars.current = 0; // Reset total typed characters
    backspaceCount.current = 0; // Reset backspace count
    totalKeyStrokes.current = 0; // Reset total key strokes
    correctnessArray.current = []; // Reset correctness array
    wordArray.current = []; // Reset word array
    correctWords.current = 0; // Reset correct words count
    if (timerRef.current) clearInterval(timerRef.current); // Clear the timer if it exists
  };

  // Function to start the timer
  const startTimer = () => {
    if (!isTyping) {
      setIsTyping(true); // Set typing state to true
      setTestStartTime(new Date()); // Record test start time
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
                     if (prevTime <= 1) {
             clearInterval(timerRef.current); // Stop the timer when time is up
             setTimeUp(true); // Set time-up state to true
             setTestEndTime(new Date()); // Record test end time
             setTestCompleted(true); // Mark test as completed
             calculateStats(); // Calculate final stats
             
             // Show results popup after a short delay
             setTimeout(() => {
               const results = getComprehensiveStats();
               setFinalResults(results);
               setShowResultsPopup(true);
             }, 1000);
             
             return 0;
           }
          return prevTime - 1; // Decrease the timer by 1 second
        });
      }, 1000); // Timer interval is 1 second
    }
  };

  // Function to calculate typing stats
  const calculateStats = () => {
    const totalTyped = totalTypedChars.current; // Total typed characters
    const correctTyped = correctCharCount.current; // Correctly typed characters
    const elapsedTime = testStartTime && testEndTime ? (testEndTime - testStartTime) / 1000 : 60 - timeLeft; // Elapsed time in seconds

    // Calculate accuracy, WPM, and CPM
    const acc = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
    const calculatedWpm = elapsedTime > 0 ? Math.round((correctTyped / 5 / elapsedTime) * 60) : wpm; // Retain WPM if time is up
    const calculatedCpm = elapsedTime > 0 ? Math.round((correctTyped / elapsedTime) * 60) : cpm; // Retain CPM if time is up

    // Update state with calculated stats
    setAccuracy(acc);
    setWpm(calculatedWpm);
    setCpm(calculatedCpm);
  };

  // Function to calculate comprehensive test statistics
  const getComprehensiveStats = () => {
    // Calculate elapsed time in seconds
    let elapsedTime = 0;
    if (testStartTime && testEndTime) {
      elapsedTime = Math.max(0, Math.round((testEndTime - testStartTime) / 1000));
    } else {
      elapsedTime = testData?.durationInMinutes ? testData.durationInMinutes * 60 - timeLeft : 60 - timeLeft;
    }
    // Prevent negative time
    elapsedTime = Math.max(elapsedTime, 0);

    // Key strokes
    const totalKeyStrokesVal = totalKeyStrokes.current;
    const typedKeyStrokesVal = inputText.length;

    // Words
    const sentenceWords = getTypingText().split(/\s+/).filter(Boolean);
    const inputWords = inputText.trim().split(/\s+/).filter(Boolean);

    // Correct words calculation
    let correctWordsCount = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === sentenceWords[i]) correctWordsCount++;
    }

    // Gross speed (typed chars / 5) / (minutes)
    const minutes = elapsedTime > 0 ? elapsedTime / 60 : 1;
    const grossSpeed = minutes > 0 ? Math.round((typedKeyStrokesVal / 5) / minutes) : 0;

    // Net speed (correct chars / 5 - mistakes) / (minutes)
    const netSpeed = minutes > 0 ? Math.round(((correctCharCount.current / 5) - mistakes) / minutes) : 0;

    // Error percentage
    const errorPercentage = totalKeyStrokesVal > 0 ? Math.round((mistakes / totalKeyStrokesVal) * 100) : 0;

    // Accuracy
    const accuracyVal = totalKeyStrokesVal > 0 ? Math.round((correctCharCount.current / totalKeyStrokesVal) * 100) : 100;

    // Leftout key strokes
    const leftoutKeyStrokes = sentence.length - typedKeyStrokesVal;

    // Half error key strokes
    const halfErrorKeyStrokes = Math.round(mistakes / 2);

    return {
      timeTaken: elapsedTime,
      totalKeyStrokes: totalKeyStrokesVal,
      typedKeyStrokes: typedKeyStrokesVal,
      grossSpeed,
      netSpeed,
      halfErrorKeyStrokes,
      leftoutKeyStrokes,
      totalWords: sentenceWords.length,
      wordsTyped: inputWords.length,
      correctWords: correctWordsCount,
      mistakes,
      backspacePressed: backspaceCount.current,
      errorPercentage,
      accuracy: accuracyVal,
      status: testCompleted ? 'Completed' : timeUp ? 'Time Up' : 'In Progress'
    };
  };

  // Function to handle results popup actions
  const handleRetryTest = () => {
    setShowResultsPopup(false);
    resetTest();
  };

  const handleBackToTests = () => {
    setShowResultsPopup(false);
    navigate(-1);
  };

  const handleCloseResults = () => {
    setShowResultsPopup(false);
  };

  const handleSubmitTest = () => {
    if (isTyping && !testCompleted) {
      // Stop the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Set test end time and completion status
      setTestEndTime(new Date());
      setTestCompleted(true);
      setIsTyping(false);
      setTimeUp(true);
      
      // Calculate final stats
      calculateStats();
      
      // Show results popup after a short delay
      setTimeout(() => {
        const results = getComprehensiveStats();
        setFinalResults(results);
        setShowResultsPopup(true);
      }, 500);
    }
  };

  // Function to handle user input
  const handleInput = (value) => {
    totalKeyStrokes.current++; // Increment total key strokes

    // Handle backspace
    if (value.length < inputText.length) {
      backspaceCount.current++; // Increment backspace count
      setInputText(value);
      if (correctnessArray.current.length > 0) {
        const lastCorrect = correctnessArray.current.pop();
        if (!lastCorrect) {
          setMistakes((prev) => Math.max(prev - 1, 0)); // Decrease mistakes if the last character was incorrect
        } else {
          correctCharCount.current = Math.max(correctCharCount.current - 1, 0); // Decrease correct character count
        }
        totalTypedChars.current = Math.max(totalTypedChars.current - 1, 0); // Decrease total typed characters
        setCurrIndex((prev) => Math.max(prev - 1, 0)); // Move back one character
      }
      return;
    }

    let updatedInput = value;

    // Map English to Kruti Dev characters if Hindi is selected
    if (language === "hindi") {
      const lastChar = value[value.length - 1];
      const krutiChar = krutiDevMap[lastChar] || "";
      updatedInput = inputText + krutiChar;
    }

    setInputText(updatedInput); // Update the input text
    startTimer(); // Start the timer if not already started

    if (currIndex < sentence.length) {
      const expectedChar = sentence[currIndex]; // Get the expected character
      const typedChar =
        language === "hindi" ? krutiDevMap[value[value.length - 1]] || "" : value[value.length - 1];

      totalTypedChars.current++; // Increment total typed characters

      if (typedChar === expectedChar) {
        correctCharCount.current++; // Increment correct character count
        correctnessArray.current.push(true); // Mark the character as correct
      } else {
        setMistakes((prev) => prev + 1); // Increment mistakes
        correctnessArray.current.push(false); // Mark the character as incorrect
      }

      setCurrIndex((prev) => prev + 1); // Move to the next character

      // Update word tracking
      const currentWords = updatedInput.split(/\s+/).filter(word => word.length > 0);
      wordArray.current = currentWords;
      correctWords.current = currentWords.length;

      // Update WPM and CPM
      const elapsedTime = testStartTime ? (new Date() - testStartTime) / 1000 : 60 - timeLeft;
      const calculatedWpm = elapsedTime > 0 ? Math.round((correctCharCount.current / 5 / elapsedTime) * 60) : wpm;
      const calculatedCpm = elapsedTime > 0 ? Math.round((correctCharCount.current / elapsedTime) * 60) : cpm;

      setWpm(calculatedWpm);
      setCpm(calculatedCpm);

      // Update accuracy
      const acc = totalTypedChars.current > 0
        ? Math.round((correctCharCount.current / totalTypedChars.current) * 100)
        : 100;
      setAccuracy(acc);
    }
  };

  return (
    <>
      <Container fluid className={`min-vh-100 d-flex flex-column justify-content-center align-items-center px-3 py-4 ${timeUp ? "bg-danger" : "bg-primary"}`}>
        {/* Test Header */}
        {testData && (
          <Row className="w-100 justify-content-center mb-3">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <div className="test-header bg-white rounded p-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0 text-primary">{testData.title}</h4>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    ← Back to Tests
                  </button>
                </div>
                {courseData && (
                  <p className="text-muted mb-2">
                    <strong>Course:</strong> {courseData.name}
                  </p>
                )}
                <div className="d-flex flex-wrap gap-3">
                  <span className="badge bg-info">Duration: {testData.durationInMinutes} min</span>
                  <span className="badge bg-secondary">Type: {testData.type}</span>
                  <span className="badge bg-success">Language: {testData.language}</span>
                  {testData.discountPercentage > 0 && (
                    <span className="badge bg-warning text-dark">
                      {testData.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Language Selector */}
        <Row className="w-100 justify-content-center mb-4">
          <Col xs={12} sm={8} md={6} lg={4}>
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </Col>
        </Row>

        {/* Typing Card */}
        <Row className="w-100 justify-content-center mb-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                         <TypingCard
               language={language}
               sentence={sentence}
               inputText={inputText}
               handleInput={handleInput}
               timeUp={timeUp}
               resetTest={resetTest}
               isTyping={isTyping}
               onSubmitTest={handleSubmitTest}
             />
          </Col>
        </Row>

        {/* Typing Stats */}
        <Row className="w-100 justify-content-center mb-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <TypingStats 
              timeLeft={timeLeft} 
              mistakes={mistakes} 
              wpm={wpm} 
              cpm={cpm} 
              accuracy={accuracy}
              totalKeyStrokes={totalKeyStrokes.current}
              backspacePressed={backspaceCount.current}
            />
          </Col>
        </Row>

        {/* Comprehensive Results */}
        {testCompleted && (
          <Row className="w-100 justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <ComprehensiveResults stats={getComprehensiveStats()} />
            </Col>
          </Row>
        )}

        {/* Test Results Popup */}
                 <TestResultsPopup
           show={showResultsPopup}
           onHide={handleCloseResults}
           results={finalResults}
           testData={testData}
           courseData={courseData}
           onRetry={handleRetryTest}
           onBackToTests={handleBackToTests}
           isTyping={isTyping}
           testCompleted={testCompleted}
         />
      </Container>
    </>
  );
};

export default TypingScreen;