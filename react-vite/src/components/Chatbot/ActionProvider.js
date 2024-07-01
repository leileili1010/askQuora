class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    const storedChatHistory = localStorage.getItem('chat_messages');
    this.chatHistory = storedChatHistory ? JSON.parse(storedChatHistory) : [];
  }

  async handleMessage(message) {
    this.chatHistory.push({ role: "user", content: message });
    localStorage.setItem('chat_messages', JSON.stringify(this.chatHistory));

    try {
      const response = await fetch("/api/openai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: this.chatHistory
        })
      });

      const data = await response.json();
      if (response.ok) {
        const reply = data.reply;

        this.chatHistory.push({ role: "assistant", content: reply });
        localStorage.setItem('chat_messages', JSON.stringify(this.chatHistory));
        

        const botMessage = this.createChatBotMessage(reply);

        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage]

        }));
      } else {
        console.error("Chat Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default ActionProvider;


  