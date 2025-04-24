import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("questions");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const handleAdd = (newQuestion) => {
    setQuestions((prev) => [...prev, newQuestion]);
    setView("questions");
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    });
  };

  const handleUpdate = (id, correctIndex) => {
    const parsedIndex = Number(correctIndex);
  
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: parsedIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        updatedQuestion.correctIndex = Number(updatedQuestion.correctIndex); // Force type safety
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === id
              ? {
                  ...q,
                  ...updatedQuestion, 
                }
              : q
          )
        );
      });
  };
  

  return (
    <div className="App">
      <h1>QuizMaster Admin</h1>
      <button onClick={() => setView("questions")}>View Questions</button>
      <button onClick={() => setView("form")}>New Question</button>

      {view === "questions" && (
        <QuestionList
          questions={questions}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
      {view === "form" && <QuestionForm onAdd={handleAdd} />}
    </div>
  );
}

export default App;
