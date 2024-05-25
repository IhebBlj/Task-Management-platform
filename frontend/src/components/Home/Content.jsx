
import React from 'react';
import styled from 'styled-components';
const ContentH=styled.div`
       max-width: 800px;
       margin: auto;
       padding: 50px;
       text-align: center;
       margin-top: 70px;
       background-color:white;
       width:100%
`
const H=styled.h1`
       font-size: 48px;
       font-family: Graphik;
       color: #1B4332;
`
const Text=styled.p`
       font-size: 20px;
       font-family: Graphik;
       color: #1B4332;
       `
const Cta=styled.a`
       display: inline-block;
       margin: 10px;
       padding: 15px 30px;
       border-radius: 25px;
       text-decoration: none;
       color: #fff;
       font-size: 24px;
       background-color: #1B4332;
       &:hover{
        background-color: #45DD87;
          color:#1B4332 ;
          border: 2px solid #1B4332;
       }
      `
const LearnMore=styled.a`
       display: inline-block;
       margin: 10px;
       padding: 15px 30px;
       border-radius: 25px;
       text-decoration: none;
       font-size: 24px;
       background-color: #fff;
          color: #1B4332;
          border: 2px solid #1B4332;
          &:hover {
          background-color: #45DD87;
          color: #fff;
       }
`
const Con= styled.div`
background-color:white;
padding:60px;
`
function Content() {
  return (
    <Con>
    <ContentH>
      <H>Organize, Prioritize, Accomplish</H>
      <Text>Welcome to TaskRoom - your comprehensive solution for organizing your tasks and boosting productivity. Whether you're jotting down notes, planning projects, or collaborating with your team, TaskRoom provides the tools you need to stay on top of your work.</Text>
      <Cta href="/signup" >Get Started</Cta>
      <LearnMore href="#">Learn more</LearnMore>
    </ContentH>
    </Con>
  );
}

export default Content;
