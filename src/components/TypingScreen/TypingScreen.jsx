import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TypingCard from "./TypingComponent/TypingCard";
import TypingStats from "./TypingComponent/TypingStats";
import LanguageSelector from "./TypingComponent/LanguageSelector";
import { krutiDevMap } from "./engine/krutiDevMap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample text for English and Hindi
////////////////////////////////
// Sample text for English and Hindi
const textSamples = {
  english: "The quick brown fox jumps over the lazy dog. A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
  hindi: "तेज़ भूरी लोमड़ी आलसी कुत्ते के ऊपर कूदती है।  अनुच्छेद लेखन एक विषय पर संक्षिप्त, स्पष्ट और संगठित रूप से विचार प्रस्तुत करने की कला है। इसमें प्रवाह और तार्किक क्रम बना रहना चाहिए ताकि पाठक विषय को आसानी से समझ सके।एक प्रभावी अनुच्छेद की विशेषताएँ क्या हैं?  प्रभावी अनुच्छेद स्पष्ट, संक्षिप्त, तार्किक और रोचक होता है। इसमें मुख्य विचार, सहायक तर्क और निष्कर्ष होते हैं। सरल भाषा और प्रवाह बनाए रखना आवश्यक होता है।   अनुच्छेद लेखन के मुख्य भाग कौन-कौन से होते हैं? अनुच्छेद लेखन के तीन मुख्य भाग होते हैं— (1) भूमिका, जो विषय का परिचय देती है, (2) मुख्य भाग, जो विषय की विस्तृत जानकारी देता है, और (3) निष्कर्ष, जो सारांश प्रस्तुत करता है। अनुच्छेद लेखन का महत्व क्या है? अनुच्छेद लेखन लेखन कौशल, विचारों की स्पष्टता और संप्रेषण क्षमता को बढ़ाता है। यह शिक्षा, साहित्य, समाचार पत्रों और पेशेवर लेखन में उपयोगी होता है, जिससे जानकारी प्रभावी ढंग से प्रस्तुत की जाती है।",
};

const TypingScreen = () => {
  // State variables for managing the typing test
  const [language, setLanguage] = useState("english"); // Current language
  const [sentence, setSentence] = useState(textSamples[language].split("")); // Sentence to type
  const [inputText, setInputText] = useState(""); // User's input
  const [currIndex, setCurrIndex] = useState(0); // Current index in the sentence
  const [mistakes, setMistakes] = useState(0); // Mistakes count
  const [timeLeft, setTimeLeft] = useState(60); // Time left for the test
  const [wpm, setWpm] = useState(0); // Words per minute
  const [cpm, setCpm] = useState(0); // Characters per minute
  const [accuracy, setAccuracy] = useState(100); // Typing accuracy
  const [isTyping, setIsTyping] = useState(false); // Whether the user is typing
  const [timeUp, setTimeUp] = useState(false); // Whether the time is up

  // Refs for tracking typing progress
  const correctCharCount = useRef(0); // Correctly typed characters
  const totalTypedChars = useRef(0); // Total typed characters
  const timerRef = useRef(null); // Timer reference
  const correctnessArray = useRef([]); // Array to track correctness of each character

  // Effect to reset the test when the language changes
  useEffect(() => {
    setSentence(textSamples[language].split(""));
    resetTest();
  }, [language]);

  // Function to reset the test
  const resetTest = () => {
    setInputText(""); // Clear the input text
    setCurrIndex(0); // Reset the current index
    setMistakes(0); // Reset the mistakes count
    setTimeLeft(60); // Reset the timer to 60 seconds
    setWpm(0); // Reset words per minute
    setCpm(0); // Reset characters per minute
    setAccuracy(100); // Reset accuracy
    setIsTyping(false); // Reset typing state
    setTimeUp(false); // Reset time-up state
    correctCharCount.current = 0; // Reset correct character count
    totalTypedChars.current = 0; // Reset total typed characters
    correctnessArray.current = []; // Reset correctness array
    if (timerRef.current) clearInterval(timerRef.current); // Clear the timer if it exists
  };

  // Function to start the timer
  const startTimer = () => {
    if (!isTyping) {
      setIsTyping(true); // Set typing state to true
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current); // Stop the timer when time is up
            setTimeUp(true); // Set time-up state to true
            calculateStats(); // Calculate final stats
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
    const elapsedTime = 60 - timeLeft; // Elapsed time in seconds

    // Calculate accuracy, WPM, and CPM
    const acc = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
    const calculatedWpm = elapsedTime > 0 ? Math.round((correctTyped / 5 / elapsedTime) * 60) : wpm; // Retain WPM if time is up
    const calculatedCpm = elapsedTime > 0 ? Math.round((correctTyped / elapsedTime) * 60) : cpm; // Retain CPM if time is up

    // Update state with calculated stats
    setAccuracy(acc);
    setWpm(calculatedWpm);
    setCpm(calculatedCpm);
  };

  // Function to handle user input
  const handleInput = (value) => {
    // Handle backspace
    if (value.length < inputText.length) {
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

      // Update WPM and CPM
      const elapsedTime = 60 - timeLeft;
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
      <Container
        fluid
        className={`min-vh-100 d-flex flex-column justify-content-center align-items-center px-3 py-4 ${
          timeUp ? "bg-danger" : "bg-primary"
        }`}
      >
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
            />
          </Col>
        </Row>

        {/* Typing Stats */}
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <TypingStats timeLeft={timeLeft} mistakes={mistakes} wpm={wpm} cpm={cpm} accuracy={accuracy} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TypingScreen;