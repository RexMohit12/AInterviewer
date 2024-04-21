import react, { useState } from 'react';
import ChatApp from './ChatApp.js';
import VideoPlayer from './VideoPlayer.js';
import STTButton from './STTButton.js';
function Container() {
    const [flag, setFlag] = useState(false);
    return ( 
        <div className="container">
            <div className='virtualHR'>
                <div className='HR'>
                 <VideoPlayer flag={flag} setFlag={setFlag} />
                </div>
            </div>
            <div className="interviewText">
            <ChatApp flag={flag} setFlag={setFlag} />
            </div>
        </div>
     );
}

export default Container;