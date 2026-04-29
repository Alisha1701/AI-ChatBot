"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { personas, Persona } from "@/lib/personas";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [activePersona, setActivePersona] = useState<Persona>(personas.anshuman);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const switchPersona = (persona: Persona) => {
    setActivePersona(persona);
    setMessages([]);
    setError(null);
    setInput("");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: activePersona.id,
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages([...updatedMessages, { role: "assistant", content: data.message }]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const getActiveStyle = () => ({
    "--active-color": activePersona.color,
    "--active-rgb": activePersona.color === "#6366f1"
      ? "99, 102, 241"
      : activePersona.color === "#10b981"
        ? "16, 185, 129"
        : "245, 158, 11",
  } as React.CSSProperties);

  return (
    <>
      {/* Background Effects */}
      <div className="bg-grid" />
      <div className="bg-gradient" />
      <div className="bg-gradient-2" />

      <div className="app-container" style={{ position: "relative", zIndex: 1, ...getActiveStyle() }}>
        {/* Header */}
        <header className="header" id="app-header">
          <div className="header-top">
            <div className="logo">
              <div className="logo-icon">SC</div>
              <div>
                <div className="logo-text">Scaler Persona Chat</div>
                <div className="logo-subtitle">AI-Powered Conversations</div>
              </div>
            </div>
            <span className="header-badge">✨ Powered by Gemini</span>
          </div>

          {/* Persona Tabs */}
          <div className="persona-tabs" id="persona-switcher">
            {Object.values(personas).map((persona) => (
              <button
                key={persona.id}
                id={`persona-tab-${persona.id}`}
                className={`persona-tab ${activePersona.id === persona.id ? "active" : ""}`}
                onClick={() => switchPersona(persona)}
                style={
                  activePersona.id === persona.id
                    ? ({
                        "--active-color": persona.color,
                        "--active-rgb":
                          persona.color === "#6366f1"
                            ? "99, 102, 241"
                            : persona.color === "#10b981"
                              ? "16, 185, 129"
                              : "245, 158, 11",
                        borderColor: persona.color,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <div
                  className="tab-avatar"
                  style={{ background: persona.gradient }}
                >
                  {persona.avatar}
                </div>
                <div className="tab-info">
                  <span className="tab-name">{persona.name}</span>
                  <span className="tab-role">{persona.title.split(",")[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </header>

        {/* Chat Area */}
        <div className="chat-area" id="chat-area">
          {messages.length === 0 && !isLoading ? (
            /* Welcome Screen */
            <div className="welcome-screen" id="welcome-screen">
              <div
                className="welcome-avatar"
                style={{ background: activePersona.gradient }}
              >
                {activePersona.avatar}
              </div>
              <h1 className="welcome-name">{activePersona.name}</h1>
              <p className="welcome-title">{activePersona.title}</p>
              <p className="welcome-desc">
                Start a conversation with {activePersona.name.split(" ")[0]}. Ask
                about their journey, get career advice, or discuss tech and
                education.
              </p>

              {/* Suggestion Chips */}
              <div className="suggestions" id="suggestion-chips">
                {activePersona.suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    id={`suggestion-${activePersona.id}-${i}`}
                    className="suggestion-chip"
                    onClick={() => sendMessage(suggestion)}
                  >
                    💬 {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.role}`}
                  id={`message-${index}`}
                >
                  <div
                    className={`message-avatar ${msg.role === "user" ? "user-avatar" : ""}`}
                    style={
                      msg.role === "assistant"
                        ? { background: activePersona.gradient }
                        : undefined
                    }
                  >
                    {msg.role === "user" ? "You" : activePersona.avatar}
                  </div>
                  <div className="message-bubble">{msg.content}</div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="typing-indicator" id="typing-indicator">
                  <div
                    className="message-avatar"
                    style={{ background: activePersona.gradient }}
                  >
                    {activePersona.avatar}
                  </div>
                  <div className="typing-dots">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="error-message" id="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <form onSubmit={handleSubmit} className="input-container" id="chat-form">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                id="chat-input"
                className="chat-input"
                rows={1}
                placeholder={`Ask ${activePersona.name.split(" ")[0]} something...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              id="send-button"
              className="send-btn"
              style={{ background: activePersona.gradient }}
              disabled={!input.trim() || isLoading}
            >
              ➤
            </button>
          </form>
          <p className="input-hint">
            Chatting with {activePersona.name} • Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
}
