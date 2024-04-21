import React, { useState } from 'react';
import SpeechToText from './SpeechToText'; // Assuming you have a SpeechToText component

function STTButton() {
    const [isClicked, setIsClicked] = useState(false);
    const [text, setText] = useState('');

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (isClicked) {
            // Add the text to your chat app here
            console.log(text); // For now, just log the text
        }
    }

    return (
        <div className='button'>
            {isClicked ? (
                <>
                    {/* <button onClick={handleClick}>
                        <div style={{width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'red'}}></div>
                    </button> */}
                    <SpeechToText onTextReady={setText}/> {/* Assuming your SpeechToText component accepts an onTextReady prop */}
                </>
            ) : (
                <button onClick={handleClick}>Press To Answer</button>
            )}
        </div>
    );
}

export default STTButton;