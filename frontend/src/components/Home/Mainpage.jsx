import {useEffect,React} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Content from './Content';
import About from './About';
import Services from './Services';
import FooterC from './Footer';






function Mainpage() {
  const navigateTo = useNavigate();
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user){
    user.isAdmin ?navigateTo("/admin-dashboard"):navigateTo("/dashboard");
  } 


}, [navigateTo]);
  return (
    <div >
      <Navbar />
      <Content />
      <About />
      <Services />
      <FooterC />
   
      </div>
  );
}

export default Mainpage;