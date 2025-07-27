import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  // State for the countdown timer, managed internally by Question component
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Effect to handle the countdown logic
  useEffect(() => {
    // If time runs out, call onAnswered(false) and reset the timer for the next question
    if (timeRemaining === 0) {
      onAnswered(false); // Notify parent that time ran out
      // The timer will be reset to 10 by the next useEffect when 'question' changes,
      // or immediately if the same question is re-rendered for some reason.
      return;
    }

    // Set a timeout to decrement timeRemaining after 1 second
    const timerId = setTimeout(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    // Cleanup function: clears the timeout to prevent memory leaks and unexpected behavior
    // when the component unmounts or when dependencies change.
    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]); // Dependencies:
  // - timeRemaining: Rerun effect when time changes (to set next timeout or trigger time-out logic)
  // - onAnswered: Included because it's used inside the effect, ensuring stability.

  // Effect to reset the timer whenever the 'question' prop changes (i.e., a new question is displayed)
  useEffect(() => {
    setTimeRemaining(10); // Reset time to 10 for the new question
  }, [question]); // Dependency: 'question' prop

  // Handler for when an answer button is clicked
  const handleAnswerClick = (isCorrect) => {
    // When an answer is clicked, immediately notify the parent.
    // The timer will be implicitly cleared by the cleanup function of the useEffect
    // as the component might re-render with a new question (triggering useEffect cleanup).
    onAnswered(isCorrect);
  };

  return (
    <>
      <h1>Question: {question.prompt}</h1>
      {/* Display time remaining, matching the test's expected text */}
      <p>{timeRemaining} seconds remaining</p>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button
            key={index} // Using index as key; a unique ID from answers data would be better if available
            onClick={() => handleAnswerClick(index === question.correctIndex)}
          >
            {answer}
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;
