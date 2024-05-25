import { MenuItem } from "@chakra-ui/react";
import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { getSender } from "./Chats/config/ChatLogics";
import { ChatState } from "./Chats/Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { useDeleteNotificationMutation, useGetInvitationsQuery, useGetNotificationsQuery, useInvitaionResponseMutation } from "../redux/slices/api/userApiSlice";
import { useSelector } from "react-redux";

const ICONS = {
  alert : (
    <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  project : (
    <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  invitation : (
    <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ) ,
  message: (
    <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
};

const NotificationPanel = () => {
  const { user } = useSelector((state) => state.auth);

  const navigateTo=useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
const [notificationData,setNotificationData] = useState([]);
  const {
    setSelectedChat,
    notification,
    setNotification,

  } = ChatState();


  const readHandler = () => {};
  const viewHandler = () => {};

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
  
  ];
  const ID = user?._id
  let requests;
const { data, isLoading, error ,refetch:refetchInvitations} = useGetInvitationsQuery(ID,{ keepUnusedDataFor: 0 });
const { data: notificationsData, isLoading: isNotificationsLoading ,refetch:refetchNotifications} = useGetNotificationsQuery({ userId: ID });
console.log(notificationsData);


useEffect(() => {

  if (data) {
    setNotification(data);
  }
}, [data, setNotification]);

useEffect(() => {
if (notificationsData?.notifications) {
  setNotification(notificationsData?.notifications);
}
}, [notificationsData?.notifications, setNotification]);

const [deleteNotification] = useDeleteNotificationMutation();
const [invitaionResponse] = useInvitaionResponseMutation();

const handleAccept=async(invitationId,closePopover)=>{
try{
  const response = await invitaionResponse({invitationId:invitationId,response:"accepted"});
  console.log(response);
  setNotificationData([]);
  closePopover();

}catch(err){
console.log(err);
}
};
const handleRefuse=async(invitationId,closePopover)=>{
  try{
    const response = await invitaionResponse({invitationId:invitationId,response:"refused"});
    console.log(response);
    setNotificationData([]);
    closePopover();
  }catch(err){
  console.log(err);
  }
  console.log("refused");
};

const handleDelete = async(notifID,task)=>{
  try{
   const response = await deleteNotification({notificationId:notifID});
   console.log(response);
   console.log(task);
   if(task){
    navigateTo(`/task/${task}`);
   }
    
  }catch(err){
    console.log(err)
  }
}
const handleRemove = async(notifID)=>{
  try{
   const response = await deleteNotification({notificationId:notifID});
   console.log(response);

  }catch(err){
    console.log(err)
  }
}
  return (
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center outline-none'>
          <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {notification?.length > 0 && (
              <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                {notification?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max  px-4'>
            {({ close }) =>
              notification?.length > 0 && (
                <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                  <div className='p-4'>
                    {notification?.map((item, index) => (
                      item.notiType=="alert"?<div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                          {ICONS[item.notiType]}
                        </div>

                        <div
                          className='cursor-pointer'
                          onClick={() => handleRemove(item._id)}
                        >
                         
                          <p className='line-clamp-1 mt-1 text-gray-600'>
                            {item.text}
                          </p>
                        </div>
                      </div>:item.notiType=="project"?(
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                       >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                          {ICONS[item.notiType]}
                        </div>

                        <div
                         
                          onClick={() => handleDelete(item?._id,item?.task)}
                        >
                          
                          <p className='line-clamp-1 mt-1 text-gray-600'>
                            {item.text}
                          </p>
                        </div>
                        
                      </div>):item.senderEmail?(
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                       >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                          {ICONS["invitation"]}
                        </div>

                        <div>
                          
                          <p className='line-clamp-1 mt-1 text-gray-600'>
                            {item.senderEmail} sent you an invitaion !
                          </p>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 mt-4 rounded" onClick={() => handleAccept(item._id,close)}>Accept</button> <button className="bg-red-400 hover:bg-red-500 text-white font-bold ml-4 mt-4 py-2 px-4 rounded" onClick={() => handleRefuse(item._id,close)}>Refuse</button> 
                        </div>
                        
                      </div>):
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                       >
           
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedChat(item.message.chat);
                    setNotification(notification.filter((n) => n !== item));
                    navigateTo("/messages");
                  }}
                >
                <p className='line-clamp-1 mt-1 text-gray-600'>
                {console.log(item.message.chat)}
                  {item.message.chat.isGroupChat
                    ? `New Message in ${item.message.chat.chatName}`
                    : `New Message from ${getSender(user, item.message.chat.users)}`}
                    </p>
                </div>
              
            
            </div>
                      
                      


                      

              ))}
                  </div>

                  <div className='grid grid-cols-1 divide-x bg-gray-50'>
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={
                          item?.onClick ? () => item.onClick() : () => close()
                        }
                        className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          </Popover.Panel>
        </Transition>
      </Popover>
  );
};

export default NotificationPanel;
