import React, { useState } from "react";
import run from "./Config/gemni"; // Import the run function from your gemni.js file

function GeminiRequestComponent() {
  const [response, setResponse] = useState(""); // To hold the response text
  const [input, setInput] = useState(""); // To hold the user input

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await run(input); // Pass the input to the run function
      setResponse(result); // Update the state with the response
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  return (
    <div>
      <h1>Gemini API Request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt"
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Response from Gemini API:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default GeminiRequestComponent;
