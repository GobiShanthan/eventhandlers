import styled from "styled-components";
import { motion } from "framer-motion";
import { darkGold, lightGold, lightBlack, grey } from "../Colors/colors";

export const MessagesCnt = styled.div`
  position: relative;
  height: 450px;
  background-color: ${grey};
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageContainer = styled(motion.div)`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
`;

export const Message = styled(motion.div)`
  display: flex;
  justify-content: ${(props) => (props.align === "user" ? "right" : "left")};
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  padding: 5px;

  p {
    width: 200px;
    text-align: left;
    color: ${lightBlack};
    background-color: ${(props) =>
      props.person === "user" ? "#8e793e" : "#Ad974F"};
    border-radius: 15px;
    padding: 10px;
    inline-size: 200px;
    overflow-wrap: break-word;
  }
`;

export const ChatFooter = styled.div`
  position: absolute;
  bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
  width: 90%;
  background-color: ${lightBlack};
  border-radius: 5px;
`;

export const MessageBar = styled.div`
  width: 100%;

  textarea {
    color: ${lightGold};
    font-size: 18px;
    width: 100%;
    height: 50px;
    resize: none;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SendButton = styled(motion.button)`
  background-color: ${darkGold};
  color: ${grey};
  padding: 5px;
  border-radius: 5px;
`;
