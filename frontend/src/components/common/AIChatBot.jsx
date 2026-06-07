import { useState, useEffect, useRef } from "react"
import ApiService from "../../services/ApiService"

export default function AIChatBot() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            from: "ai",
            text: "Hi! I'm your Sports Assistant 🏆 Ask me anything about matches, teams, players, or general sports!"
        }
    ])
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = async () => {
        if (!message.trim() || loading) return

        const userMsg = message.trim()
        setMessage("")
        setMessages(prev => [...prev, { from: "user", text: userMsg }])
        setLoading(true)

        try {
            const res = await ApiService.chatBot({ message: userMsg })
            if (res.data.success) {
                setMessages(prev => [...prev, { from: "ai", text: res.data.data.reply }])
            } else {
                setMessages(prev => [...prev, { from: "ai", text: "Sorry, something went wrong. Please try again." }])
            }
        // } catch (err) {
        //     setMessages(prev => [...prev, { from: "ai", text: "Sorry, I'm unable to connect right now." }])

        } catch (err) {
              setMessages(prev => [...prev, { from: "ai", text: "Sorry, AI is temporarily unavailable. Please try again in a moment." }])
          console.error("ChatBot error:", err)

          
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.widget}>

            {/* Floating Button */}
            {!open && (
                <button style={styles.floatingButton} onClick={() => setOpen(true)} title="AI Sports Assistant">
                    🤖
                </button>
            )}

            {/* Chat Panel */}
            {open && (
                <div style={styles.chatContainer}>

                    {/* Header */}
                    <div style={styles.header}>
                        <span>🏆 Sports AI Assistant</span>
                        <button style={styles.closeBtn} onClick={() => setOpen(false)}>X</button>
                    </div>

                    {/* Messages */}
                    <div style={styles.messagesBox}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.messageRow,
                                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start"
                                }}
                            >
                                <div style={{
                                    ...styles.bubble,
                                    background: msg.from === "user" ? "rgb(44, 122, 123)" : "#f1f0f0",
                                    color: msg.from === "user" ? "#fff" : "#000",
                                    borderBottomRightRadius: msg.from === "user" ? 4 : 16,
                                    borderBottomLeftRadius: msg.from === "user" ? 16 : 4,
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {loading && (
                            <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
                                <div style={{
                                    ...styles.bubble,
                                    background: "#f1f0f0",
                                    color: "#888",
                                    fontStyle: "italic"
                                }}>
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div style={styles.inputArea}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask about matches, teams..."
                            style={styles.input}
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                ...styles.sendBtn,
                                opacity: loading ? 0.6 : 1
                            }}
                            disabled={loading}
                        >
                            ➤
                        </button>
                    </div>

                </div>
            )}
        </div>
    )
}

const styles = {
    widget: {
        position: "fixed",
        bottom: 90,   // ChatWidget (💬) se upar rakha — conflict nahi hoga
        right: 20,
        zIndex: 9998
    },
    floatingButton: {
        borderRadius: "50%",
        width: 60,
        height: 60,
        fontSize: 24,
        background: "rgb(44, 122, 123)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    },
    chatContainer: {
        width: 350,
        height: 500,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    header: {
        padding: "10px 15px",
        background: "rgb(44, 122, 123)",
        color: "#fff",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    closeBtn: {
        border: "none",
        background: "transparent",
        color: "#fff",
        cursor: "pointer",
        fontSize: 16
    },
    messagesBox: {
        flex: 1,
        overflowY: "auto",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    messageRow: {
        display: "flex"
    },
    bubble: {
        padding: "10px 14px",
        borderRadius: 16,
        maxWidth: "80%",
        fontSize: 13,
        lineHeight: 1.5
    },
    inputArea: {
        display: "flex",
        padding: 10,
        borderTop: "1px solid #ddd",
        gap: 8
    },
    input: {
        flex: 1,
        padding: "8px 12px",
        borderRadius: 20,
        border: "1px solid #ddd",
        outline: "none",
        fontSize: 13
    },
    sendBtn: {
        padding: "8px 14px",
        borderRadius: 20,
        border: "none",
        background: "rgb(44, 122, 123)",
        color: "#fff",
        cursor: "pointer",
        fontSize: 16
    }
}