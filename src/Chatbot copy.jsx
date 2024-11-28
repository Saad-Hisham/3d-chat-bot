import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import run from './Config/gemni';
import { changeState } from '../Redux/RobotSettings';

function Chatbot() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can I help you?" }]);
  const [inputMessage, setInputMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState("Hi! How can I help you?");
  const [loadingFallback, setLoadingFallback] = useState(false);
  const state = useSelector((state) => state.counter.state);
  const dispatch = useDispatch();

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: inputMessage }];
    setMessages(newMessages);
    let dontUnderstand = false;

    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: 'user',
        message: inputMessage,
      });

      const botMessages = response.data.map((res) => ({
        sender: 'bot',
        text: res.text,
      }));

      const combinedBotMessage = botMessages
        .filter((message) => message.sender === 'bot')
        .map((message) => message.text)
        .join(' ');

      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      setDisplayedMessage(combinedBotMessage);

      if (combinedBotMessage === "I'm sorry, I didn't quite understand that. Could you rephrase?") {
        dontUnderstand = true;
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    if (dontUnderstand) {
      setLoadingFallback(true);
      try {
        const result = await run(inputMessage);
        setDisplayedMessage(result);
      } catch (error) {
        console.error("Error with Google API:", error);
        setDisplayedMessage("I'm sorry, I didn't quite understand that. Could you rephrase?");
      } finally {
        setLoadingFallback(false);
      }
    }

    setInputMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div className="chat-window">
        <div className="bot-message">
          {messages.length > 0 && messages[messages.length - 1].sender === "bot" ? (
            <Typewriter
              key={displayedMessage}  // Ensures re-rendering when message changes
              options={{
                autoStart: true,
                loop: false,
                deleteSpeed: Infinity,
                typeSpeed: 10,
              }}
              onInit={(typewriter) => {
                dispatch(changeState("Talking"));
                typewriter
                  .typeString(loadingFallback ? "Let me think" : displayedMessage)
                  .callFunction(() => {
                    dispatch(changeState("Greeting"));
                  })
                  .start();
              }}
            />
          ) : null}
        </div>
      </div>

      <input
        type="text"
        placeholder="Ask a Question?"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}

export default Chatbot;