import React, { useState } from 'react';
import './Settings';
import { useUpdateNameMutation} from '../redux/slices/api/userApiSlice';
import { useSelector } from 'react-redux';
const SettingsPage = () => {
  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false);
   const [first_name,setFirstName] = useState();
   const [last_name,setLastName] = useState();
   const [hidden,setHidden] = useState(true);
   const { user } = useSelector((state) => state.auth);
const [current,setCurrent] = useState();
const [password,setPassword] = useState();
const [valid,setValid] = useState(false)
const [wrong,setWrong] = useState(false)
  const toggleAccountsDropdown = () => {
    setShowAccountsDropdown(!showAccountsDropdown);
  };


  const [updateName] = useUpdateNameMutation()
const [changePassword] = useChangePasswordMutation();
  const handleSubmit=async()=>{
    try{
    const response = await updateName({firstName:first_name,lastName:last_name,userId:user._id});
    console.log(response);
    }catch(err){
console.log(err);
    }
  }
  const handlePaswordSubmit=async()=>{
    try{
    const response = await changePassword({current:current,password:password,userId:user._id});
    console.log(response);
    if(response.status===OK){
       setValid(true);
       setWrong(false)
    }else{
      setValid(false);
      setWrong(true);
    }
    }catch(err){
console.log(err);
    }
  }
   return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="relative my-4 w-56 sm:hidden">
          <input
            className="peer hidden"
            type="checkbox"
            name="select-1"
            id="select-1"
            checked={showAccountsDropdown}
            onChange={toggleAccountsDropdown}
          />
          <label
            htmlFor="select-1"
            className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
          >
            Accounts
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition ${
              showAccountsDropdown ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <ul
            className={`max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 ${
              showAccountsDropdown ? 'max-h-56 py-3' : ''
            }`}
          >
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-[#0C9E7B] hover:text-white">
              Accounts
            </li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
              Team
            </li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
              Others
            </li>
          </ul>
        </div>

       

        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          </div>
          <hr className="mt-4 mb-8" />
          <p className="py-2 text-xl font-semibold"></p>
      
          <p className="py-2 text-xl font-semibold">Name</p>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500"> </span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#0C9E7B]">
                  <input
                    type="text"
                    id="first-name"
                    value={user.first_name}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="First name"
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </div>
              </label>
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500"></span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#0C9E7B]">
                  <input
                    type="text"
                    id="last-name"
                    value={user.last_name}
                    onChange={(e)=>setLastName(e.target.value)}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Last name"
                  />
                </div>
              </label>
            </div>

            <div>
            <span style={{color:"green",display:hidden&&"none"}} >Name changed successfully !</span>
            </div>
            <button className="mt-4 rounded-lg bg-[#0C9E7B] px-4 py-2 text-white" onClick={handleSubmit}>Save Name</button>

          <hr className="mt-4 mb-8" />

          <p className="py-2 text-xl font-semibold">Password</p>
          <div className="flex items-center">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500">Current Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#0C9E7B]">
                  <input
                    type="password"
                    id="login-password"
                    onChange={(e)=>setCurrent(e.target.value)}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                  />
                </div>
              </label>
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500">New Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#0C9E7B]">
                  <input
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    id="comfirm-login-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                  />
                </div>
              </label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
</svg>
</div>
  <span style={{color:"red",display:!wrong&&"none"}}>The current password is wrong ! Please verify</span>
  <span style={{color:"green",display:!valid&&"none"}}>The password has been changed !</span>

<p className="mt-2">
Can't remember your current password.{' '}
<a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">
Recover Account
</a>
</p>
<div>
</div>
<button className="mt-4 rounded-lg bg-[#0C9E7B] px-4 py-2 text-white" onClick={()=>handlePaswordSubmit()}>Save Password</button>
<hr className="mt-4 mb-8" />
<div className="mb-10">
        <p className="py-2 text-xl font-semibold">Delete Account</p>
        <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Proceed with caution
        </p>
        <p className="mt-2">
          Make sure you have taken backup of your account in case you ever need to get access to your data. We will
          completely wipe your data. There is no way to access your account after this action.
        </p>
        <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
          Continue with deletion
        </button>
      </div>
    </div>
  </div>
</div>
);
};

export default SettingsPage;