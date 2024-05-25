import React from 'react'
import Chatpage from "./components/Chats/Pages/Chatpage";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./components/Chats/Context/ChatProvider";
import NotificationPanel from './components/NotificationPanel';

const ChatApp = () => {
 
  return (
<ChakraProvider>   
    <Chatpage />
</ChakraProvider>
  )
}

export default ChatApp;