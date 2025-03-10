import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment,useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Dashboard from "./pages/dashboard";
import { setOpenSidebar } from "./redux/slices/authSlice";
import Chatbot from "./Chatbot";
import About from './components/Home/About';
import Services from './components/Home/Services';
import SignInSide from './components/Home/Signin'; 
import SignUp from './components/Home/SignUp';
import Footer from './components/Home/Footer';
import Mainpage from './components/Home/Mainpage';
import ContactForm from './components/Home/ContactForm';
import SettingsPage from "./pages/Settings";
import ChatApp from "./ChatApp";
import Assets from "./components/AssetTable";
import Calendar from "./Calendar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import ContactInquiries from "./components/ContactInquiries";
function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  const { user } = useSelector((state) => state.auth);
  
  console.log(user);
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
          <Route path="/" exact element={<Mainpage />} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/signin" element={<SignInSide onAuth={(user)=>setUser(user)} />} /> 
          <Route path='/contact' element={<ContactForm />} />
          <Route path='/Signup' element={<SignUp onAuth={(user)=>setUser(user)}/>} />
          <Route element={<Layout />}>
         {!user.isAdmin &&<Route path='/dashboard' element={<Dashboard />} />} 
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/task/:id' element={<TaskDetails />} />
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/task/:id/assets' element={<Assets />} />
          <Route path='/messages' element={<ChatApp />} />
          <Route path='/calendar' element={<Calendar />} />
       {user.isAdmin && (
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        )}
        <Route path='/users' element={<AdminUsers />} />
        <Route path='/contact-inquiries' element={<ContactInquiries />} />
        {user.isAdmin && (
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        )}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
