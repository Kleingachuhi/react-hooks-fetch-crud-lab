import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleSelectChange = (e) => {
    onUpdate(id, Number(e.target.value)); // Ensure numeric type
  };

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
          aria-label="Correct Answer"
          value={correctIndex}
          onChange={handleSelectChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
