import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from './Avatar';
import UserAvatar from './UserAvatar';

const config = {
  botName: "Qbot",
  initialMessages: [createChatBotMessage("Hi! I'm Qbot. How can I assist you today?")],
  customComponents: {
    botAvatar: (props) => <Avatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
  },

};

export default config;