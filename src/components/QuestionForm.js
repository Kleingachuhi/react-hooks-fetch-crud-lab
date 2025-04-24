import React, { useState } from "react";

function QuestionForm({ onAdd }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex: Number(correctIndex), // Ensure it's a number
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then(onAdd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt
        <input
          aria-label="Prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <label>
        Answer 1
        <input
          aria-label="Answer 1"
          type="text"
          value={answers[0]}
          onChange={(e) => handleAnswerChange(0, e.target.value)}
        />
      </label>
      <label>
        Answer 2
        <input
          aria-label="Answer 2"
          type="text"
          value={answers[1]}
          onChange={(e) => handleAnswerChange(1, e.target.value)}
        />
      </label>
      <label>
        Correct Answer
        <input
          aria-label="Correct Answer"
          type="number"
          min="0"
          max={answers.length - 1}
          value={correctIndex}
          onChange={(e) => setCorrectIndex(Number(e.target.value))} // Number here too
        />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;



