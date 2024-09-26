"use client";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
interface Message {
  text: string;
  align: "left" | "right";
  seen?: boolean;
}

interface MessageBubbleProps {
  text: string;
  align: "left" | "right";
  seen?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, align, seen }) => (
  <div
    className={`col-start-${align === "left" ? 1 : 6} col-end-${
      align === "left" ? 8 : 13
    } p-3 rounded-lg`}
  >
    <div
      className={`flex items-center justify-${
        align === "left" ? "start" : "start flex-row-reverse"
      }`}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
        {align === "left" ? <img src="/bear.png" /> : <img src="/panda.png" />}
      </div>
      <div
        className={`relative ${align === "left" ? "ml-3" : "mr-3"} text-sm ${
          align === "left" ? "bg-white" : "bg-indigo-100"
        } py-2 px-4 shadow rounded-xl`}
      >
        <div>{text}</div>
        {seen && (
          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
            Seen
          </div>
        )}
      </div>
    </div>
  </div>
);

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>();

  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (messages?.length) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const data = localStorage.getItem("messages");
    const parsedData = JSON.parse(data as string);
    if (Array.isArray(parsedData)) {
      setMessages(parsedData);
    }
  }, []);

  const onSend = async () => {
    if (loading) return;
    if (!inputMessage) return;

    setMessages((prevMessages) => [
      ...(prevMessages || []), // Provide a default empty array if prevMessages is undefined
      { text: inputMessage, align: "right" },
    ]);
    setInputMessage("");

    setLoading(true);

    try {
      const res = await axios.post("/api/message", {
        question: inputMessage,
        threadId: JSON.parse(localStorage.getItem("threadId") as string),
      });

      setMessages((prevMessages) => [
        ...(prevMessages || []), // Same here
        { text: res.data.response.content[0].text.value, align: "left" },
      ]);

      if (!localStorage.getItem("threadId")) {
        localStorage.setItem("threadId", JSON.stringify(res.data.threadId));
      }
    } catch (error) {
      console.error(error); // Make sure to reset loading state on error as well
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="md:h-[90vh] xs:h-[90vh] xs:bg-gray-200 ">
      <div className="flex h-[80%] xs:h-[100%] antialiased text-gray-800">
        <div className="flex flex-col h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full md:p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  {/* Replacing grid with flex */}
                  <div className="flex flex-col space-y-2">
                    {messages?.length &&
                      messages.map((msg, index) => (
                        <MessageBubble
                          key={index}
                          text={msg.text}
                          align={msg.align}
                          seen={false}
                        />
                      ))}
                    {loading && (
                      <div className="flex justify-start  p-3 rounded-lg">
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-500 mr-3"></div>
                            <span>Typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!loading && (
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none pl-4 py-4 h-10"
                    value={inputMessage}
                    disabled={loading}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div
                    className="relative right-12 cursor-pointer"
                    onClick={onSend}
                  >
                    <Send />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
