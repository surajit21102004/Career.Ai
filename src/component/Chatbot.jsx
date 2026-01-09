import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader } from 'lucide-react';

const SuraAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = 'AIzaSyBuYf7rm3M_ywWeEel4AWGH6qXlU4n6oCo';

  // Predefined questions and answers
  const predefinedResponses = {
    'Who developed you?': 'I was developed by Mr. Surajit Mandal.',
    'What is your name?': 'I am Sura.AI, created by Surajit Mandal.',
    'How can I contact Mr. Surajit?': (
      <>
        Click on <a href="https://wa.me/918910710493" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Contact Now</a> to reach Surajit on WhatsApp.
      </>
    ),
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchGeminiResponse = async (userInput) => {
    // Check if the input has a predefined response
    if (predefinedResponses[userInput]) {
      return predefinedResponses[userInput];
    }

    // Proceed with API call if no predefined response
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Act as an AI assistant named Sura.AI. You are helpful, friendly, and knowledgeable. 
                Provide detailed and accurate responses. Format your responses with proper spacing and structure.
                Keep your tone professional yet conversational.
                
                Human's question: ${userInput}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      return 'I encountered an error processing your request. This might be due to API limits or network issues. Please try rephrasing your question or try again in a moment.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetchGeminiResponse(input);
      
      const aiMessage = {
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <div 
        className="fixed bottom-8 right-8 z-50 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 group-hover:scale-110">
          <MessageCircle size={28} className="text-white" />
        </div>
        <div className="absolute bottom-full right-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            Chat with Sura.AI
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-white text-lg font-semibold">Sura.AI</h2>
                <p className="text-blue-100 text-xs">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <Bot size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Welcome to Sura.AI!</h3>
                <p className="text-sm">Ask me anything - I'm here to help!</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-blue-600" />
                    )}
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-2xl p-3 rounded-bl-none shadow-md border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Bot size={16} className="text-blue-600" />
                    <div className="flex gap-1">
                      <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce"></div>
                      <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce delay-100"></div>
                      <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg border text-black border-gray-300 shadow-sm focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuraAI;
