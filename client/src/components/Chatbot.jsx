import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

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

    setMessages(prev => [...prev, userMsg]);

    try {
      const API_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:4000"
          : "https://stayease07.onrender.com";

      const res = await fetch(`${API_URL}/api/chat`, {
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
        time: getTime(),
        properties: data.properties || []
      };

      setMessages(prev => [...prev, botMsg]);

    } catch {
      setMessages(prev => [
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
          <div style={styles.header}>StayEase Assistant</div>

          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <div key={i}>

                {/* TEXT MESSAGE */}
                <div
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
                        msg.sender === "user" ? "#fff" : "#111827"
                    }}
                  >
                    {msg.text}
                    <div style={styles.time}>{msg.time}</div>
                  </div>
                </div>

                {/* 🏡 PROPERTY CARDS */}
                {msg.properties && msg.properties.length > 0 && (
                  <div style={styles.cardContainer}>
                    {msg.properties.map((p, index) => (
                      <div key={index} style={styles.card}>
                        <img
                          src={p.imageUrls?.[0]}
                          alt=""
                          style={styles.image}
                        />

                        <div style={styles.cardContent}>
                          <h4>{p.title}</h4>
                          <p>📍 {p.address}</p>
                          <p>💰 ₹{p.regularPrice}</p>
                          <p>
                            🛏 {p.bedrooms} Bed | 🛁 {p.bathrooms}
                          </p>

                          <button
                            style={styles.viewBtn}
                            onClick={() => navigate(`/property/${p._id}`)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div style={styles.inputBox}>
            <input
              type="text"
              placeholder="Ask about properties..."
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
    width: "70px",
    height: "70px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
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
    width: "350px",
    height: "500px",
    background: "#ffffff",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    textAlign: "center",
    fontWeight: "600"
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
    borderRadius: "12px"
  },

  time: {
    fontSize: "10px",
    textAlign: "right",
    marginTop: "3px",
    color: "#6b7280"
  },

  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "10px"
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  cardContent: {
    padding: "10px"
  },

  viewBtn: {
    marginTop: "8px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  inputBox: {
    display: "flex",
    padding: "8px",
    borderTop: "1px solid #ddd"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ddd"
  },

  button: {
    background: "#2563eb",
    border: "none",
    marginLeft: "8px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    color: "#fff",
    cursor: "pointer"
  }
};

export default Chatbot;