import React, { useState, useEffect } from 'react';

const SpeechToText = ({ onTranscription }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognition = new window.webkitSpeechRecognition();
  recognition.interimResults = true;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    setTranscript(text);
    onTranscription(text);
  };

  useEffect(() => {
    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <div className='STT'>
      {/* <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button> */}
    </div>
  );
};

export default SpeechToText;