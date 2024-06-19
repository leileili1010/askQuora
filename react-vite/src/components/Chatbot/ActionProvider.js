class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.chatHistory = [];
  }

  async handleMessage(message) {
    this.chatHistory.push({ role: "user", content: message });

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

        this.chatHistory.push({ role: "bot", content: reply });

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


  