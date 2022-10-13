import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

//Material UI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import {
  MessagesCnt,
  MessageContainer,
  Message,
  ChatFooter,
  MessageBar,
  SendButton,
} from "./ChatModal.styled";
import {grey, lightGold} from "../Colors/colors"

let socket = io();

//Modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: `${grey}`,
  border: `10px solid ${lightGold}`,
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
};

export default function ChatModal({
  vendorId,
  messageHistory,
  setMessageHistory,
}) {
  const { userInfo } = useSelector((state) => state.login);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let currentUser = userInfo && userInfo._id ? userInfo.name : null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    let userData = {
      user: currentUser && currentUser,
      message,
    };
    setMessageHistory([...messageHistory, userData]);

    socket.emit("message", {
      text: message,
      name: userInfo.name,
      userId: userInfo._id,
      userSocketId: socket.id,
      vendorId,
    });
    setMessage("");
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div>
      <Button onClick={handleOpen}>Start Chat</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MessagesCnt>
            {messageHistory && messageHistory.length ? (
              messageHistory.map((m, i) => (
                <MessageContainer>
                  <Message
                    key={i}
                    person={m.user === userInfo.name ? "user" : "notUser"}
                    align={m.user === userInfo.name ? "user" : "notUser"}
                  >
                    <p>
                      <h1>{m.user} says:</h1> {m.message}
                    </p>
                  </Message>
                </MessageContainer>
              ))
            ) : (
              <h1></h1>
            )}
            <div ref={lastMessageRef} />
          </MessagesCnt>

          <form onSubmit={handleSendMessage}>
            <ChatFooter>
              <MessageBar>
                <textarea
                  type="text"
                  placeholder="Write a message"
                  className="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </MessageBar>
              <SendButton whileHover={{ scale: 1.1 }}>SEND</SendButton>
            </ChatFooter>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
