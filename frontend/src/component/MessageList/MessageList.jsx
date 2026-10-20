

import { Bot } from 'lucide-react';
import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import styles from './MessageList.module.css';

export default function MessageList({
  conversations,
  isLoading,
  messagesEndRef,
}) {
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  return (
    <div className={styles.messages}>
      {safeConversations.length === 0 ? (
        <div className={styles.empty}>What are you working on?</div>
      ) : (
        safeConversations.map((item, index) => {
          const userContent = 
            item.userConversation?.content || 
            (item.role === 'user' ? item.content : null);

          const assistantContent = 
            item.assistantConversation?.content || 
            (item.role === 'assistant' ? item.content : null);

          const uniqueId = item.id || item.userConversation?.id || `conv-${index}`;

          return (
            <React.Fragment key={uniqueId}>
              {userContent && (
                <ChatMessage 
                  role="user" 
                  content={String(userContent)} 
                />
              )}
              {assistantContent && (
                <ChatMessage 
                  role="assistant" 
                  content={String(assistantContent)} 
                />
              )}
            </React.Fragment>
          );
        })
      )}

      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAvatar}>
            <Bot size={18} color="white" />
          </div>
          <div className={styles.loading}>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}