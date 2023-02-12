import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Conversation: React.FC = () => {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState<String[]>([]);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const handleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
      if (text !== "") {
        conversation.push(text);
      }
      setText("");
    } else {
      setText("");
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const resetConversation = () => {
    setConversation([]);
  };

  return (
    <div className="Container">
      <div>/-------------/</div>
      <div>/-- 대화내용 --/</div>
      <div>/-------------/</div>
      <div className="conversation">
        {conversation.map((item, index) => (
          <div className="chatBox" key={index}>
            <p>&gt;{item}</p>
          </div>
        ))}
      </div>
      <p>
        ------------------------------------------------------------------------
      </p>
      <div className="speech">
        <div className="textBox"> &gt; {text}</div>
      </div>
      <div className="buttonContainer">
        {listening ? (
          <button onClick={handleListen} className="micOff">
            <FiberManualRecordIcon className="Icon" />
            <div className="micText">스탑</div>
          </button>
        ) : (
          <button onClick={handleListen} className="micOn">
            <KeyboardVoiceIcon className="Icon" />
            <div className="micText">말하기</div>
          </button>
        )}
        <button onClick={resetConversation} className="reset">
          <RestartAltIcon className="Icon" />
          <div className="micText">리셋하기</div>
        </button>
      </div>
    </div>
  );
};
export default Conversation;
