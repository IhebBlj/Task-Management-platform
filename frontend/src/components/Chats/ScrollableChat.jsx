import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./config/ChatLogics";
import { ChatState } from "./Context/ChatProvider";


const AvatarUser = ({ name, size = 'sm', className }) => {
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
        mt-4
        mr-1
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          
          <div style={{ display: "flex" }} key={m._id}>
          {console.log(m.sender.first_name)}
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.first_name} placement="bottom-start" hasArrow>
           
               
                <AvatarUser name={`${m.sender.first_name} ${m.sender.last_name}`}  className="mr-2" />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
            
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
