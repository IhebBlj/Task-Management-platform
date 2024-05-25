
import React from 'react';
import styled from 'styled-components';
const Container=styled.div`
         display: grid;
         justify-content: space-around;
         align-items: center;
         width: 100%;
         height: 100%;
         background-color: white;
         min-height: calc(100vh - 200px); 
`
const Title=styled.h2`
         font-size: 200%;
         color: #1B4332;
         display: flex;
         margin-left: 5%;
         margin-top: 2%;
         font-family:Graphik;
`
const Desc=styled.p`
         color: #1B4332;
         font-weight: 500;
         font-size: larger;
margin:5%;
margin-top:1%;
         line-height: 1.7;
         font-family: Graphik;`

const Hr=styled.hr`
         border: 0;
         height: 1px;
         background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));

`
function About() {
  return (
    <Container id="about">
      <span><Hr /></span>
      <Title>Introducing TaskRoom</Title>
      <Desc>TaskRoom is the ultimate solution for streamlining workflows and enhancing productivity. Seamlessly integrating with email, calendar, and project management tools, it eliminates the need for manual data entry and simplifies task management. Whether you're a solo entrepreneur or part of a large enterprise, TaskRoom scales effortlessly to meet your needs, offering customizable workflows tailored to your unique requirements.

      Security is paramount in today's digital world, and TaskRoom prioritizes data protection. With robust encryption, multi-factor authentication, and compliance standards, TaskRoom ensures the safety of your sensitive information, providing peace of mind for your organization.

      Gain valuable insights into your workflows with TaskRoom's powerful analytics. Track task completion rates, monitor project milestones, and analyze time spent on various activities. Armed with this information, you can make informed decisions to drive continuous improvement and organizational growth.

      Accountability is key to effective teamwork, and TaskRoom facilitates it seamlessly. Transparent task assignments, deadlines, and progress tracking mechanisms promote alignment and commitment across teams, driving collective success.

      Additionally, TaskRoom optimizes time management with intuitive scheduling features. Set due dates, receive reminders, and track time spent on tasks to enhance productivity and maintain a healthy work-life balance.

      Experience the future of productivity with TaskRoom—an innovative solution designed to streamline workflows, enhance security, and foster collaboration within your organization.</Desc>
      <span><Hr /></span>
    </Container>
  );
}

export default About;
