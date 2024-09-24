'use client';
import React, { useState } from 'react';

interface Message {
  text: string;
  align: 'left' | 'right';
  seen?: boolean;
}

interface MessageBubbleProps {
  text: string;
  align: 'left' | 'right';
  seen?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, align, seen }) => (
  <div className={`col-start-${align === 'left' ? 1 : 6} col-end-${align === 'left' ? 8 : 13} p-3 rounded-lg`}>
    <div className={`flex items-center justify-${align === 'left' ? 'start' : 'start flex-row-reverse'}`}>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">{align === 'left' ? <img src='/bear.png' /> : <img src='/panda.png' />}</div>
      <div className={`relative ${align === 'left' ? 'ml-3' : 'mr-3'} text-sm ${align === 'left' ? 'bg-white' : 'bg-indigo-100'} py-2 px-4 shadow rounded-xl`}>
        <div>{text}</div>
        {seen && <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">Seen</div>}
      </div>
    </div>
  </div>
);

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey, how are you today?", align: "left" },
    { text: "I'm ok, what about you?", align: "right" },
  ]);

  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const onSend = () => {
    if (!inputMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, align: "right" },
    ]);
    setInputMessage("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "This is an auto-reply!", align: "left" },
      ]);
      setLoading(false);
    }, 2000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className='h-screen'>
      <div className="flex h-[80%] antialiased text-gray-800">
        <div className="flex flex-col h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  {/* Replacing grid with flex */}
                  <div className="flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                      <MessageBubble
                        key={index}
                        text={msg.text}
                        align={msg.align}
                        seen={false}
                      />
                    ))}
                    {loading && (
                      <div className="flex justify-start flex-row-reverse p-3 rounded-lg">
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-500 mr-2"></div>
                            <span>Typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <div className="relative w-full flex gap-x-4">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      onClick={onSend}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Chat;
