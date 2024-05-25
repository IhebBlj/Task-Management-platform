import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "./Context/ChatProvider";
import styled from 'styled-components';

const StyledBox = styled(Box)`
  display: ${({ selectedChat }) => (selectedChat ? 'flex' : 'none')};
  align-items: center;
  flex-direction: column;
  padding: 3px;
  background-color: white;
  width: 100%;
  height: 500px;
  border-radius: 8px;
  border-width: 1px;

  @media screen and (min-width: 768px) {
    display: flex;
    width: 68%;
  }
`;



const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat,notification } = ChatState();
  return (
   <StyledBox selectedChat={selectedChat} >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </StyledBox>
  );
};

export default Chatbox;
