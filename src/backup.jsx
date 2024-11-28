import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Typewriter from 'typewriter-effect';

import axios from 'axios';

import { changeState } from '../Redux/RobotSettings';


function Chatbot() {

  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can I help you ?" }]);

  const [inputMessage, setInputMessage] = useState('');

  const [displayedMessage, setDisplayedMessage] = useState("Hi how can I help you ?")

  const state = useSelector((state) => state.counter.state);

  const dispatch = useDispatch();

  const sendMessage = async () => {

    if (inputMessage.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: inputMessage }];

    setMessages(newMessages);

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
      setDisplayedMessage(combinedBotMessage)

    } catch (error) {

      console.error('Error sending message:', error);
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
              options={{
                autoStart: true,
                loop: false,
                deleteSpeed: Infinity,
                typeSpeed: 10,
              }}

              onInit={(typewriter) => {

                dispatch(changeState("Talking"));


                typewriter

                  .typeString(displayedMessage)

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
