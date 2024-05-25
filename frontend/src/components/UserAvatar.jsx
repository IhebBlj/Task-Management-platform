import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
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
const UserAvatar = () => {
  const {isOpen,onClose,onOpen}=useDisclosure();
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const logoutHandler = () => {
    
      localStorage.removeItem('userInfo');
      navigateTo('/signin');
    
  };

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
  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button>
              <span className='text-white font-semibold'>
               <Avatar name={user?.first_name} size="md" className="mr-2"/>
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
              <div className='p-4'>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;
