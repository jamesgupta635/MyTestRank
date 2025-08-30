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

const textSamples = {
  english: "The quick brown fox jumps over the lazy dog. A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
  hindi: "तेज़ भूरी लोमड़ी आलसी कुत्ते के ऊपर कूदती है।  अनुच्छेद लेखन एक विषय पर संक्षिप्त, स्पष्ट और संगठित रूप से विचार प्रस्तुत करने की कला है। इसमें प्रवाह और तार्किक क्रम बना रहना चाहिए ताकि पाठक विषय को आसानी से समझ सके।",
};

const TypingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const testData = location.state?.testData;
  const courseData = location.state?.courseData;
  
  if (!testData) {
    return (
      <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="text-center">
          <h3 className="text-muted mb-3">No Test Selected</h3>
          <p className="text-muted mb-4">Please select a test from the course page to start typing.</p>
          <button className="btn btn-primary" onClick={() => navigate('/coursesExam')}>
            Go to Courses
          </button>
        </div>
      </Container>
    );
  }
  
  const getTypingText = () => testData?.contain || testData?.description || textSamples.english;

  const [language, setLanguage] = useState("english");
  const [sentence, setSentence] = useState(getTypingText().split(""));
  const [inputText, setInputText] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testData?.durationInMinutes ? testData.durationInMinutes * 60 : 60);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTyping, setIsTyping] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStartTime, setTestStartTime] = useState(null);
  const [testEndTime, setTestEndTime] = useState(null);
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const [finalResults, setFinalResults] = useState(null);

  const refs = useRef({
    correctCharCount: 0,
    totalTypedChars: 0,
    backspaceCount: 0,
    totalKeyStrokes: 0,
    timer: null,
    correctnessArray: [],
    wordArray: [],
    correctWords: 0
  });

  useEffect(() => {
    setSentence(language === "hindi" ? textSamples.hindi.split("") : getTypingText().split(""));
    resetTest();
  }, [language]);

  const resetTest = () => {
    setInputText("");
    setCurrIndex(0);
    setMistakes(0);
    setTimeLeft(testData?.durationInMinutes ? testData.durationInMinutes * 60 : 60);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    setIsTyping(false);
    setTimeUp(false);
    setTestCompleted(false);
    setTestStartTime(null);
    setTestEndTime(null);
    setShowResultsPopup(false);
    setFinalResults(null);
    
    Object.keys(refs.current).forEach(key => {
      if (key === 'timer') {
        if (refs.current[key]) clearInterval(refs.current[key]);
        refs.current[key] = null;
      } else if (Array.isArray(refs.current[key])) {
        refs.current[key] = [];
      } else {
        refs.current[key] = 0;
      }
    });
  };

  const startTimer = () => {
    if (!isTyping) {
      setIsTyping(true);
      setTestStartTime(new Date());
      refs.current.timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(refs.current.timer);
            setTimeUp(true);
            setTestEndTime(new Date());
            setTestCompleted(true);
            calculateStats();
            setTimeout(() => {
              setFinalResults(getComprehensiveStats());
              setShowResultsPopup(true);
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const calculateStats = () => {
    const { totalTypedChars, correctCharCount } = refs.current;
    const elapsedTime = testStartTime && testEndTime ? (testEndTime - testStartTime) / 1000 : 60 - timeLeft;
    const acc = totalTypedChars > 0 ? Math.round((correctCharCount / totalTypedChars) * 100) : 100;
    const calculatedWpm = elapsedTime > 0 ? Math.round((correctCharCount / 5 / elapsedTime) * 60) : wpm;
    const calculatedCpm = elapsedTime > 0 ? Math.round((correctCharCount / elapsedTime) * 60) : cpm;
    setAccuracy(acc);
    setWpm(calculatedWpm);
    setCpm(calculatedCpm);
  };

  const getComprehensiveStats = () => {
    let elapsedTime = Math.max(0, testStartTime && testEndTime ? 
      Math.round((testEndTime - testStartTime) / 1000) : 
      testData?.durationInMinutes ? testData.durationInMinutes * 60 - timeLeft : 60 - timeLeft);

    const { totalKeyStrokes, correctCharCount } = refs.current;
    const typedKeyStrokes = inputText.length;
    const sentenceWords = getTypingText().split(/\s+/).filter(Boolean);
    const inputWords = inputText.trim().split(/\s+/).filter(Boolean);
    const correctWordsCount = inputWords.filter((word, i) => word === sentenceWords[i]).length;

    const minutes = elapsedTime > 0 ? elapsedTime / 60 : 1;
    const grossSpeed = minutes > 0 ? Math.round((typedKeyStrokes / 5) / minutes) : 0;
    const netSpeed = minutes > 0 ? Math.round(((correctCharCount / 5) - mistakes) / minutes) : 0;
    const errorPercentage = totalKeyStrokes > 0 ? Math.round((mistakes / totalKeyStrokes) * 100) : 0;
    const accuracyVal = totalKeyStrokes > 0 ? Math.round((correctCharCount / totalKeyStrokes) * 100) : 100;

    return {
      timeTaken: elapsedTime, totalKeyStrokes, typedKeyStrokes, grossSpeed, netSpeed,
      halfErrorKeyStrokes: Math.round(mistakes / 2), leftoutKeyStrokes: sentence.length - typedKeyStrokes,
      totalWords: sentenceWords.length, wordsTyped: inputWords.length, correctWords: correctWordsCount,
      mistakes, backspacePressed: refs.current.backspaceCount, errorPercentage, accuracy: accuracyVal,
      status: testCompleted ? 'Completed' : timeUp ? 'Time Up' : 'In Progress'
    };
  };

  const handleInput = (value) => {
    refs.current.totalKeyStrokes++;

    if (value.length < inputText.length) {
      refs.current.backspaceCount++;
      setInputText(value);
      if (refs.current.correctnessArray.length > 0) {
        const lastCorrect = refs.current.correctnessArray.pop();
        if (!lastCorrect) setMistakes(prev => Math.max(prev - 1, 0));
        else refs.current.correctCharCount = Math.max(refs.current.correctCharCount - 1, 0);
        refs.current.totalTypedChars = Math.max(refs.current.totalTypedChars - 1, 0);
        setCurrIndex(prev => Math.max(prev - 1, 0));
      }
      return;
    }

    const updatedInput = language === "hindi" ? 
      inputText + (krutiDevMap[value[value.length - 1]] || "") : value;
    setInputText(updatedInput);
    startTimer();

    if (currIndex < sentence.length) {
      const expectedChar = sentence[currIndex];
      const typedChar = language === "hindi" ? 
        krutiDevMap[value[value.length - 1]] || "" : value[value.length - 1];

      refs.current.totalTypedChars++;
      
      if (typedChar === expectedChar) {
        refs.current.correctCharCount++;
        refs.current.correctnessArray.push(true);
      } else {
        setMistakes(prev => prev + 1);
        refs.current.correctnessArray.push(false);
      }

      setCurrIndex(prev => prev + 1);

      const currentWords = updatedInput.split(/\s+/).filter(word => word.length > 0);
      refs.current.wordArray = currentWords;
      refs.current.correctWords = currentWords.length;

      const elapsedTime = testStartTime ? (new Date() - testStartTime) / 1000 : 60 - timeLeft;
      const calculatedWpm = elapsedTime > 0 ? Math.round((refs.current.correctCharCount / 5 / elapsedTime) * 60) : wpm;
      const calculatedCpm = elapsedTime > 0 ? Math.round((refs.current.correctCharCount / elapsedTime) * 60) : cpm;

      setWpm(calculatedWpm);
      setCpm(calculatedCpm);

      const acc = refs.current.totalTypedChars > 0 ? 
        Math.round((refs.current.correctCharCount / refs.current.totalTypedChars) * 100) : 100;
      setAccuracy(acc);
    }
  };

  const handleSubmitTest = () => {
    if (isTyping && !testCompleted) {
      if (refs.current.timer) clearInterval(refs.current.timer);
      setTestEndTime(new Date());
      setTestCompleted(true);
      setIsTyping(false);
      setTimeUp(true);
      calculateStats();
      setTimeout(() => {
        setFinalResults(getComprehensiveStats());
        setShowResultsPopup(true);
      }, 500);
    }
  };

  return (
    <Container fluid className={`min-vh-100 d-flex flex-column justify-content-center align-items-center px-3 py-4 ${timeUp ? "bg-danger" : "bg-primary"}`}>
      {testData && (
        <Row className="w-100 justify-content-center mb-4">
          <Col xs={12} sm={11} md={10} lg={9} xl={8} className="mx-auto">
            <div className="test-header bg-white rounded p-4 shadow-lg">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1 me-3">
                  <h2 className="text-primary fw-bold mb-2">{testData.title}</h2>
                  {courseData && (
                    <p className="text-muted mb-3 fs-5">
                      <strong>Course:</strong> {courseData.name}
                    </p>
                  )}
                </div>
                <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate(-1)}>
                  ← Back to Tests
                </button>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <span className="badge bg-info fs-6 px-3 py-2">Duration: {testData.durationInMinutes} min</span>
                <span className="badge bg-secondary fs-6 px-3 py-2">Type: {testData.type}</span>
                <span className="badge bg-success fs-6 px-3 py-2">Language: {testData.language}</span>
                {testData.discountPercentage > 0 && (
                  <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                    {testData.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      )}

      <Row className="w-100 justify-content-center mb-4">
        <Col xs={12} sm={8} md={6} lg={5} xl={4} className="mx-auto">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </Col>
      </Row>

      <Row className="w-100 justify-content-center mb-4">
        <Col xs={120} sm={12} md={550} lg={80} xl={150} className="mx-auto">
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

      <Row className="w-100 justify-content-center mb-4">
        <Col xs={12} sm={11} md={10} lg={9} xl={8} className="mx-auto">
          <TypingStats 
            timeLeft={timeLeft} 
            mistakes={mistakes} 
            wpm={wpm} 
            cpm={cpm} 
            accuracy={accuracy}
            totalKeyStrokes={refs.current.totalKeyStrokes}
            backspacePressed={refs.current.backspaceCount}
          />
        </Col>
      </Row>

      {testCompleted && (
        <Row className="w-100 justify-content-center mb-4">
          <Col xs={12} sm={11} md={10} lg={9} xl={8} className="mx-auto">
            <ComprehensiveResults stats={getComprehensiveStats()} />
          </Col>
        </Row>
      )}

      <TestResultsPopup
        show={showResultsPopup}
        onHide={() => setShowResultsPopup(false)}
        results={finalResults}
        testData={testData}
        courseData={courseData}
        onRetry={() => { setShowResultsPopup(false); resetTest(); }}
        onBackToTests={() => { setShowResultsPopup(false); navigate(-1); }}
        isTyping={isTyping}
        testCompleted={testCompleted}
      />
    </Container>
  );
};

export default TypingScreen;