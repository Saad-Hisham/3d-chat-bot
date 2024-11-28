// Import the necessary module using ES6 syntax
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBj04kv2jOwrn3mhbB22EA-7utgsLIN6AA";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text(); // Return the text response
}

export default run;
