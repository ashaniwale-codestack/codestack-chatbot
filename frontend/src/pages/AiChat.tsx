import React, { useState, useRef, useEffect } from "react";
import { puter } from "@heyputer/puter.js";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
    
    //# to call backend API instead of direct puter call, uncomment below and comment out the puter call
    //   const result = await fetch("http://localhost:5000/api/OpenAI/chat", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ message: input }),
    //   });
    //const data = await result.json();

    
      //# to call puter directly from frontend (not recommended for production, but fine for local testing)
      const response = await puter.ai.chat(input, {
        model: "gpt-5.4-nano",
      });

      const text =
        response?.message?.content || response?.toString?.() || "No response";

      const botMessage: Message = {
        role: "assistant",
        content: text,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error occurred" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>🤖 CodeStack AI Assistant</header>

      <div style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageRow,
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                ...styles.messageBubble,
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #007bff, #00c6ff)"
                    : "#2c2c2e",
                color: msg.role === "user" ? "#fff" : "#e5e5ea",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={styles.typing}>AI is typing...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    background: "#1b1a1a",
    color: "white",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    padding: "15px",
    fontSize: "25px",
    fontWeight: "bold",
    borderBottom: "1px solid #333",
    textAlign: "center",
  },
  chatContainer: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
  messageRow: {
    display: "flex",
    marginBottom: "10px",
  },
  messageBubble: {
    padding: "12px 16px",
    borderRadius: "18px",
    maxWidth: "70%",
    fontSize: "26px",
    lineHeight: "1.4",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  },
  typing: {
    fontStyle: "italic",
    color: "#aaa",
  },
  inputContainer: {
    display: "flex",
    padding: "15px",
    borderTop: "1px solid #333",
    background: "#2c2c2e",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    fontSize: "26px",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 18px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #007bff, #00c6ff)",
    color: "white",
    fontWeight: "bold",
    fontSize: "26px",
  },
};
