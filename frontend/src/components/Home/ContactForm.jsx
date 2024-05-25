
import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { useNavigate } from 'react-router-dom';
import { usePostInquiriesMutation } from '../../redux/slices/api/userApiSlice';





function ContactForm() {


    const [name,setName] = useState();
const [email,setEmail] = useState();
const [subject,setSubject] = useState();
const [message,setMessage]= useState();
const [postInquiries] = usePostInquiriesMutation();
const navigateTo=useNavigate();
const handleSubmit = async(e)=>{
e.preventDefault();
try{
    const data={
        name:name,
        email:email,
        subject:subject,
        message:message,
    }
const response = await postInquiries(data);
if(response){
    navigateTo('/');
}
console.log(response);
}catch(err){
    console.log(err);
}
}
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <h1 className={styles.h1}>Let's get in touch</h1>
                    <p>We're open for any suggestion</p>
                    <div className={styles.contactInfo}>
                        <p>Address : Tunisia, Sfax</p>
                        <p>Email: info@taskroom.com</p>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <h2 className={styles.h2}>Get in touch</h2>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" required  onChange={(e)=>setName(e.target.value)}/>
                        <label htmlFor="email" >Email Address</label>
                        <input type="email" id="email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" required onChange={(e)=>setSubject(e.target.value)}/>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" required onChange={(e)=>setMessage(e.target.value)}></textarea>
                        <input type="submit" value="Send Message"  />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
