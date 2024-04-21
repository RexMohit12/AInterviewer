import React, { useState, useEffect, useRef } from 'react';
import SpeechToText from './SpeechToText';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function ChatApp({ flag, setFlag }) {
  const questions = [
    "Tell me about yourself",
    "What was your percentage in Last semester?",
    "What’s the project you have done?",
    "Why Should we Hire you?",
    "Do you have any Experience - Internship done for the same role?"
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false); // State to track whether speech recognition is active
  const recognitionRef = useRef(null); // Ref for SpeechRecognition object

  const hasSentInitialQuestion = useRef(false);

  useEffect(() => {
    if (!hasSentInitialQuestion.current && messages.length === 0) {
      sendQuestion(0);
      hasSentInitialQuestion.current = true;
    }
  }, [messages]); // Depend on messages to ensure the effect only runs when messages change

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUserMessage) {
      setCurrentQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < questions.length) {
          sendQuestion(nextIndex);
        }
        return nextIndex;
      });
    }
  }, [messages]);

  const sendQuestion = (index) => {
    if (index < questions.length) {
      const question = {
        text: questions[index],
        isUserMessage: false, // false indicates this is a question from the interviewer
      };
      setMessages((prevMessages) => [...prevMessages, question]);
    }
  };

  const handleSpeechToText = (text) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUserMessage: true }]);
  };

  const toggleListening = () => {
    if (isListening) {
      handleStopListening();
    } else {
      handleStartListening();
    }
    setIsListening(prevIsListening => !prevIsListening);
  };

  const handleStartListening = () => {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleSpeechToText(text);
    };
    recognitionRef.current.start();
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setFlag(false);
    }
  };

  const downloadCSV = () => {
    const csvContent = messages.map((message, index) => {
      const question = index < questions.length ? questions[index] : '';
      return `${message.text}`; // Corrected the syntax here
    }).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'messages.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index} className={message.isUserMessage ? 'user-message' : 'received-message'}>
            {message.text}
          </p>
        ))}
      </div>
      <SpeechToText onTranscription={handleSpeechToText} /> 
      {/* Use the SpeechToText component with the onTranscription prop */}
        <div className='button'>
      <button onClick={toggleListening}>{isListening ? 'Stop Listening' : 'Start Listening'}</button>
      <button onClick={downloadCSV}>Download CSV</button>

        </div>
    </div>
  );
}

export default ChatApp;