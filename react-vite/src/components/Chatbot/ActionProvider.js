class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.chatHistory = []; 
  }

  async handleMessage(message) {
    this.chatHistory.push({ role: "user", content: message }); 

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        messages: this.chatHistory
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    this.chatHistory.push({ role: "bot", content: reply }); 

    const botMessage = this.createChatBotMessage(reply);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  }
}

export default ActionProvider;

  