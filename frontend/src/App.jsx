
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './component/sidebar/Sidebar';
import ChatHeader from './component/ChatHeader/ChatHeader';
import MessageList from './component/MessageList/MessageList';
import ChatInput from './component/chatinput/Chatinput';
import './App.css';

const API_BASE_URL = 'http://localhost:3888/api';

function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chat/conversations`);
        if (response.data.success) {
          const fetchedData = response.data.data.conversations;
          setConversations(Array.isArray(fetchedData) ? fetchedData : []);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, isLoading]);

  const handleSendMessage = async (question) => {
    if (!question.trim()) return;

    const tempPair = {
      userConversation: { role: 'user', content: question },
      assistantConversation: { role: 'assistant', content: '' }
    };

    setConversations((prev) => (Array.isArray(prev) ? [...prev, tempPair] : [tempPair]));
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        question,
      });

      if (response.data.success) {
        const rawResponse = response.data.data.response;
        
     
        const aiResponseText = 
          typeof rawResponse === 'object' && rawResponse !== null
            ? (rawResponse.content || JSON.stringify(rawResponse))
            : rawResponse;
        
        setConversations((prev) => {
          if (!Array.isArray(prev)) return prev;
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0) {
            updated[lastIndex] = {
              userConversation: { role: 'user', content: question },
              assistantConversation: { role: 'assistant', content: String(aiResponseText) }
            };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <ChatHeader />
        <MessageList 
          conversations={conversations} 
          messagesEndRef={messagesEndRef} 
          isLoading={isLoading} 
        />
        <ChatInput handleSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;