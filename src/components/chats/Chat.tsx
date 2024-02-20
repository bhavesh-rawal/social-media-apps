import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { Container } from "react-bootstrap";
import { ChatMessage } from "../../redux/actions/actions";
import { chatMessage } from "../../types/actions/Posting";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { saveUserMessage } from "../../redux/slice/PostingSlice";

const Chat = () => {
  const { chatMessage } = useSelector((state: any) => state.Post);

  const dispatch = useDispatch<any>();

  const handleChat = async (message: any) => {
    const messageUser = {
      content: message,
      direction: "outgoing" as MessageDirection,
      role: "user",
      position: "normal" as const,
    };
    await dispatch(saveUserMessage(messageUser));
    await dispatch(ChatMessage(messageUser));
  };

  return (
    <Container className="mt-5 justify-content-center d-flex">
      <Card hoverable title="Chat Box" bordered={false} className="col-5">
        <div className="App">
          <div style={{ position: "relative", height: "490px" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList>
                  {chatMessage &&
                    chatMessage.map((message: chatMessage, i: any) => {
                      return (
                        <Message
                          className="mt-3"
                          key={i}
                          model={{
                            message: message.content,
                            direction: message.direction,
                            sender: message.role,
                            position: "normal",
                          }}
                        />
                      );
                    })}
                </MessageList>
                <MessageInput
                  placeholder="Send a Message"
                  onSend={handleChat}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Chat;
