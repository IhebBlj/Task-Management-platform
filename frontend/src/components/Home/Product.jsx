
import React from 'react';
import styled from 'styled-components';

const Card=styled.div`
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         width: 30%;
         height: 80%;
         background-color: #ffffff;
   
         border-radius: 20px;
         overflow: hidden;
         margin: 4%;
         transition: 0.2s;
         &:hover{
         transform: scale(1.1);background-color: #fafafa;
     
      }
`
const CardImg=styled.img`
         width: 80%;
         height: 80%;
         background-color: #ffffff;
         border-radius: 5%;
`
const CardTitle=styled.h2`
         font-size: 20px;
         color: #264653;
         color: #1B4332;
         display: flex;
         margin:5%;

         font-family: Graphik;

`
const CardDescription=styled.p`
         font-size: large;
         color: #264653;
         text-align: center;
         padding: 0 20px;
         font-family: Graphik;
`
function Product({ imageSrc, title, description }) {
  return (
    <Card>
      <CardImg src={imageSrc} alt={title} />
      <CardTitle >{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}

export default Product;
