import * as React from "react";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client'

//Material UI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

let socket = io();

//Modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ChatModal({vendorId}) {
  const {userInfo} = useSelector(state => state.login)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', {
      text: message,
      name: userInfo.name,
      userId: userInfo._id,
      userSocketId: socket.id,
      vendorId 
    })
    setMessage('');
  }

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
        <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
        </Box>
      </Modal>
    </div>
  );
}
