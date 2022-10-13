import * as React from "react";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client'
import chatIcon from '../../images/chatIcon.webp'
//Material UI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  IconImage
} from '../../pages/AllVendors/AllVendors.styled'
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

export default function ChatModal({vendorId, messageHistory, setMessageHistory}) {
  const {userInfo} = useSelector(state => state.login)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let currentUser = userInfo && userInfo._id ? userInfo.name : null

  const handleSendMessage = (e) => {
    e.preventDefault();
    let userData = {
      'user': currentUser && currentUser,
      message

    }
    setMessageHistory([...messageHistory, userData])
    // let username = userInfo.name
    // setMessageHistory([...messageHistory, {username, message}])
    // console.log(messageHistory)
    
    socket.emit('message', {
      text: message,
      name: userInfo.name,
      userId: userInfo._id,
      userSocketId: socket.id,
      vendorId 
    })
   
    setMessage('');
  }

  // const filterMessages = (messageHistory) => {
  //   let existMessages = []
  //   let myMessages = []
  //   messageHistory && messageHistory.length > 0 ? existMessages = messageHistory : existMessages = []
  //   if (currentUser && existMessages) {
  //     for (let i = 0; i < existMessages.length; i++) {
  //       if ((currentUser === existMessages[i].userId && existMessages[i].recipientId === vendorId) ||
  //       (existMessages[i].userId === vendorId && existMessages[i].recipientId === currentUser)) {
  //         myMessages.push(existMessages[i])
  //       }
  //     }
  //   }
  //   return myMessages
  // }
  // console.log(filterMessages(messageHistory))

  return (
    <div>


      <IconImage onClick={handleOpen} whileHover={{scale:1.1}} whileTap={{scale:.9}} src={chatIcon} alt='icon-image'/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div>
          <ul>
            {console.log(messageHistory && messageHistory.length ? messageHistory : 'no history')}
            {messageHistory && messageHistory.length ? messageHistory.map((m, i) => (
              <div key={i}>
                <p>{m.user}: {m.message}</p>
              </div>
            )) 
            : <h1>no history</h1>}
            
           
          </ul>
        
        </div>

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
