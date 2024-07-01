import {useRef} from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const nodeRef = useRef(null);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <div className="chatbot-container" ref={nodeRef}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>

    </Draggable>

  );
};

export default ChatbotComponent;