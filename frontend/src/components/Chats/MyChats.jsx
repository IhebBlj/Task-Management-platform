import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "./config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "./Context/ChatProvider";
import styled from 'styled-components';
const StyledBox = styled(Box)`
  padding-bottom: 3px;
  padding-left: 3px;
  padding-right: 3px;
  margin-top:8px;
  font-size: 28px;
  font-family: Work sans;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const StyledContainerBox = styled(Box)`
  display: ${({ selectedchat }) => (selectedchat ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  padding: 3px;
  background-color: white;
  height: 500px;
  width: 100%;
  border-radius: 8px; 
  border-width: 1px;

  @media screen and (min-width: 768px) {
    display: flex;
    width: 31%;
  }
`;

const StyledInsideBox = styled(Box)`
  display: flex; 
  align-items: center; 
  cursor: pointer;
  background-color: ${({ selectedchat, chat }) =>
    selectedchat === chat ? '#38B2AC' : '#E8E8E8'};
  color: ${({ selectedchat, chat }) =>
    selectedchat === chat ? 'white' : 'black'};
  padding: 10px;
  padding-left: 20px;
  border-radius: 8px; 
  margin-top: 4px;
  &:hover {
    background-color: ${({ selectedchat, chat }) =>
      selectedchat === chat ? '#38B2AC' : '#D1D1D1'};
  }
`;

const StyledInBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 3px;
  background-color: #F8F8F8;
  width: 100%;
  height: 100%;
  border-radius: 8px; 
  overflow-y: hidden;
  margin-top:24px;
`;

const StyledButton = styled(Button)`
  display: flex;
  font-size: 16px;
  
  @media screen and (min-width: 768px) {
    font-size: 7px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 12px;
  }
`;

const ScrollableStack = styled(Stack)`
  overflow-y: scroll;
`;

const Avatar = ({ name, size = 'sm', className }) => {
  const initials = name
    .split(' ')
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join('');

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex
        items-center
        justify-center
        bg-gray-400
        text-white
        font-bold
        uppercase
        ${className}
      `}
    >
      {initials}
    </div>
  );
};


const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [latestMessage, setLatestMessage] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
     
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:${PORT}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();

  }, [fetchAgain]);

  return (
<StyledContainerBox selectedchat={selectedChat} >
      <StyledBox>
        Chats
        <GroupChatModal>
        <StyledButton rightIcon={<AddIcon />} >
            New Group Chat
            </StyledButton>
        </GroupChatModal>
        </StyledBox>
  <StyledInBox>
        {chats ? (
          <ScrollableStack>
            {chats.map((chat) => (
              <StyledInsideBox
              key={chat._id}
  onClick={() => setSelectedChat(chat)}
  selectedchat={selectedChat}
  chat={chat}
>

<Avatar name={!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName} size="md" className="mr-2" />
               <Box>
                <Text fontSize="lg">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                  
                {chat.latestMessage && (
                  
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.first_name}  </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
                </Box>
                </StyledInsideBox>
            ))}
            </ScrollableStack>
        ) : (
          <ChatLoading />
        )}
        </StyledInBox>
    </StyledContainerBox>
  );
};

export default MyChats;
