import React, { useState, useEffect } from "react";

const TypingMaster = () => {
  const targetText = "Hello world this is typing master";
  const words = targetText.split(" ");

  const [input, setInput] = useState("");
  const [typedWords, setTypedWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // Handle typing
  const handleChange = (e) => {
    const value = e.target.value;

    // start timer on first keystroke
    if (!startTime) setStartTime(Date.now());

    setInput(value);

    // split words on space
    if (value.endsWith(" ")) {
      setTypedWords([...typedWords, value.trim()]);
      setInput(""); // reset input box
    }
  };

  // Calculate results when finished
  useEffect(() => {
    if (typedWords.length === words.length) {
      let correct = 0;
      for (let i = 0; i < words.length; i++) {
        if (typedWords[i] === words[i]) correct++;
      }

      let timeTaken = (Date.now() - startTime) / 60000; 
      let wpmCalc = (correct / timeTaken).toFixed(2);
      let accuracyCalc = ((correct / words.length) * 100).toFixed(2);

      setWpm(wpmCalc);
      setAccuracy(accuracyCalc);
    }
  }, [typedWords]);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Typing Master</h1>

      {/* Target Text */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {words.map((word, index) => {
          let color = "";
          if (typedWords[index]) {
            color =
              typedWords[index] === word
                ? "text-green-600"
                : "text-red-600";
          }
          return (
            <span key={index} className={`text-lg ${color}`}>
              {word}
            </span>
          );
        })}
      </div>

      {/* Input Box */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="border-2 border-gray-400 p-2 rounded w-1/2 text-center"
        placeholder="Start typing..."
        disabled={typedWords.length === words.length}
      />

      {/* Results */}
      {typedWords.length === words.length && (
        <div className="mt-4">
          <p className="text-lg font-semibold">✅ WPM: {wpm}</p>
          <p className="text-lg font-semibold">🎯 Accuracy: {accuracy}%</p>
        </div>
      )}
    </div>
  );
};

export default TypingMaster;
