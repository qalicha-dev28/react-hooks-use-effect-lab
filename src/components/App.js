import React, { useState } from "react";
import questions from "../quiz";
import Question from "./Question";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // timeRemaining state is now managed internally by Question.js
  // const [timeRemaining, setTimeRemaining] = useState(10); 
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuestionAnswered = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      // No need to setTimeRemaining here, Question component will reset itself
    } else {
      alert(`Quiz Finished! Your score: ${score + (isCorrect ? 1 : 0)} / ${questions.length}`);
      setCurrentQuestionIndex(0);
      // No need to setTimeRemaining here
      setScore(0);
    }
  };

  return (
    <div className="App">
      <h1>Trivia Challenge</h1>
      {currentQuestion ? (
        <Question
          key={currentQuestion.id} // Important for React to re-render Question component when question changes
          question={currentQuestion}
          // timeRemaining and setTimeRemaining are no longer passed as props
          onAnswered={handleQuestionAnswered}
        />
      ) : (
        <p>Loading question...</p>
      )}
      <p>Score: {score}</p>
      <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
    </div>
  );
}

export default App;
