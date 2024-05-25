import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import styled from 'styled-components';

const StyledModalHeader = styled(ModalHeader)`
  font-size: 40px;
  font-family: Work Sans;
  display: flex;
  justify-content: center;
`;
const StyledModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const StyledImage = styled(Image)`
  border-radius: 50%; 
  width: 150px; 
  height: 150px; 
`;

const StyledText = styled(Text)`
  font-size: 28px;
  font-family: Work sans;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`;



const ProfileModal = ({ user,chat, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
console.log(chat);
const handleRemove = async ()=>{

 
const {data} = await axios.delete("http://localhost:5000/api/chat/chatremove",{
  
  data: { chat: chat }
});
console.log(data);
onClose();
window.location.reload();
}
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
        <StyledModalHeader>
  {`${user.first_name?.charAt(0).toUpperCase() + user.first_name?.slice(1)} ${user.last_name?.charAt(0).toUpperCase() + user.last_name?.slice(1)}`}
</StyledModalHeader>;
          <ModalCloseButton />
          <StyledModalBody>
          <StyledImage src={user.pic} alt={user.first_name} />
          <StyledText>
              Email: {user.email}
              </StyledText>
            </StyledModalBody>
          <ModalFooter justifyContent={"space-between"}>
          <Button bg={"#FA3260"} color="white" onClick={handleRemove}>Remove Chat</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
