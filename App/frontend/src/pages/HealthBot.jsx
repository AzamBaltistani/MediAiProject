import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SendHorizonal, Trash2, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function HealthBot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("healthChat");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const updatedMessages = [...messages, { role: "user", text: input }];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/api/healthbot/chat/", {
                messages: updatedMessages,
            });
            const reply = res.data.reply;

            const newMessages = [...updatedMessages, { role: "assistant", text: reply }];
            setMessages(newMessages);
            localStorage.setItem("healthChat", JSON.stringify(newMessages));
        } catch (err) {
            console.error("Failed to send message:", err);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        localStorage.removeItem("healthChat");
        setMessages([]);
        setInput("");
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="bg-white dark:bg-black text-black dark:text-white min-h-[calc(100vh-3.8rem)] flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-13 opacity-90 z-10 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700 p-4 flex items-center justify-between max-w-3xl w-full mx-auto">
                <h1 className="text-xl font-bold">🧠 AI Health Assistant</h1>
                <button
                    onClick={clearChat}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                >
                    <Trash2 size={16} />
                    Clear Chat
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 max-w-3xl w-full mx-auto space-y-3">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-md text-sm max-w-[85%] sm:max-w-[70%] whitespace-pre-wrap animate-fade-in ${msg.role === "user"
                            ? "bg-gray-100 dark:bg-gray-800 ml-auto text-right"
                            : "bg-green-100 dark:bg-green-800 mr-auto text-left"
                            }`}
                    >
                        <p className="font-semibold mb-1">{msg.role === "user" ? "You:" : "Bot:"}</p>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                ))}

                {loading && (
                    <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
                        <Loader2 className="inline w-5 h-5 mr-1 animate-spin" />
                        AI-Bot is thinking...
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Sticky Footer Input */}
            <div className="sticky bottom-0 z-10 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 p-4 max-w-3xl w-full mx-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 border-none px-4 py-2 bg-white dark:bg-gray-800"
                        placeholder="Ask a health question..."
                        disabled={loading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-1 disabled:opacity-50"
                    >
                        <SendHorizonal size={18} /> Send
                    </button>
                </div>
            </div>
        </div>
    );
}
