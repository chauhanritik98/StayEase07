import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi 👋 Welcome to StayEase! How can I help you?",
      sender: "bot",
      time: getTime()
    }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
      time: getTime()
    };
 
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:4000/api/chat","https://stayease07.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });
 
      const data = await res.json();

      const botMsg = {
        text: data.reply || "No response",
        sender: "bot",
        time: getTime()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Server error 😢",
          sender: "bot",
          time: getTime()
        }
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
  style={styles.fab}
  onClick={() => setOpen(!open)}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
        {open ? <FaTimes /> : <FaComments />}
      </div>

      {/* Chat Window */}
      {open && (
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>StayEase Assistant</div>

          {/* Chat Area */}
          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    ...styles.message,
                    background:
                      msg.sender === "user" ? "#2563eb" : "#e5e7eb",
                    color:
                      msg.sender === "user" ? "#fff" : "#111827",
                    borderTopRightRadius:
                      msg.sender === "user" ? "0" : "12px",
                    borderTopLeftRadius:
                      msg.sender === "bot" ? "0" : "12px"
                  }}
                >
                  {msg.text}
                  <div style={styles.time}>{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Area */}
          <div style={styles.inputBox}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} style={styles.button}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  fab: {
  position: "fixed",
  bottom: "25px",
  right: "25px",
  width: "70px",        // increased size
  height: "70px",       // increased size
  background: "#2563eb",
  color: "#fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",     // bigger icon
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(37,99,235,0.5)",
  zIndex: 999,
  transition: "all 0.3s ease",
  animation: "pulse 2s infinite"
},

  container: {
    position: "fixed",
    bottom: "90px",
    right: "25px",
    width: "320px",
    height: "450px",
    background: "#ffffff",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  },

  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    fontWeight: "600",
    textAlign: "center"
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    background: "#f9fafb"
  },

  message: {
    maxWidth: "75%",
    padding: "8px 12px",
    margin: "6px",
    borderRadius: "12px",
    fontSize: "14px",
    position: "relative",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)"
  },

  time: {
    fontSize: "10px",
    textAlign: "right",
    marginTop: "3px",
    color: "#6b7280"
  },

  inputBox: {
    display: "flex",
    padding: "8px",
    background: "#fff",
    borderTop: "1px solid #e5e7eb"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    outline: "none"
  },

  button: {
    background: "#2563eb",
    border: "none",
    marginLeft: "8px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Chatbot;