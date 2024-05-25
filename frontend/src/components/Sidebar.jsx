import React from "react";
import {
  MdDashboard,
  MdSettings,
  MdOutlineCalendarMonth,

  MdContactSupport,
} from "react-icons/md";
import { FaTasks, FaRocketchat, FaUsers ,FaSms} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Projects",
    link: "tasks",
    icon: <FaTasks />,
  },

  {
    label: "Calendar",
    link: "calendar",
    icon: <MdOutlineCalendarMonth />,
  },
  {
    label: "Chats",
    link: "messages",
    icon: <FaSms />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
    
  },
  {
    label: "Chatbot",
    link: "chatbot",
    icon: <FaRocketchat />,
  },

  
];
const adminLinks=[
  {
    label: "Dashboard",
    link: "admin-dashboard",
    icon: <MdDashboard />,
  },
  
  {
    label: "Users",
    link: "users",
    icon: <FaUsers />,
    
  },
  {
    label: "Calendar",
    link: "calendar",
    icon: <MdOutlineCalendarMonth />,
  },
  {
    label: "Chats",
    link: "messages",
    icon: <FaSms />,
  },
  {
    label: "Contact Inquiries",
    link: "contact-inquiries",
    icon: <MdContactSupport />,
  },



]

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];


  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      // 
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-[#294D4A] text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#0C9E7B]'>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5 h-screen'>
      <h1 className='flex gap-1 items-center'>
       <img src="../../images/taskroomicon.png" className="w-12 h-auto"></img>
        <span className='text-2xl font-bold text-[#1D4441]'>TaskRoom</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        { !user.isAdmin ? linkData.map((link) => (
          <NavLink el={link} key={link.label} />
        )):
        adminLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span><a href="/settings">Settings</a> </span>
        </button>
      </div>
    </div>
   
  );
};

export default Sidebar;
