import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f8f8;
  color: #4a5568;
  font-family: sans-serif;
  font-size: 0.875rem;
  padding-top: 1.5rem;
  
  width:100%
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding:1.5rem;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 0.75rem;
`;

const ColumnHeading = styled.span`
  font-weight: bold;
  color: #1a202c;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #1a202c;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #cbd5e0;
  margin: 1.5rem 0;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding:0.5rem;
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FooterText = styled.div`
  color: #1a202c;
  font-size: 0.875rem;
`;

const FooterLink = styled(Link)`
  color: #4299e1;

  &:hover {
    color: #1a202c;
  }
`;

const FooterC = () => {
  return (
    <FooterContainer>
      <MainContent>
        <Column>
          <ColumnHeading>TaskRoom Services</ColumnHeading>
          <Link href="#">Task Management</Link>
          <Link href="#">Collaboration</Link>
          <Link href="#">Project Tracking</Link>
          <Link href="#">Reporting</Link>
          <Link href="#">Team Communication</Link>
          <Link href="#">File Sharing</Link>
          <Link href="#">Time Management</Link>
        </Column>
        <Column>
          <ColumnHeading>Company</ColumnHeading>
          <Link href="#">About TaskRoom</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Partners</Link>
        </Column>
        <Column>
          <ColumnHeading>Resources</ColumnHeading>
          <Link href="#">Help Center</Link>
          <Link href="#">TaskRoom Community</Link>
          <Link href="#">API & Developers</Link>
          <Link href="#">Learning Center</Link>
        </Column>
        <Column>
          <ColumnHeading>Legal</ColumnHeading>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Security</Link>
          <Link href="#">Compliance</Link>
        </Column>
        <Column>
          <ColumnHeading>Connect</ColumnHeading>
          <Link href="#">Twitter</Link>
          <Link href="#">Facebook</Link>
          <Link href="#">LinkedIn</Link>
          <Link href="#">Instagram</Link>
        </Column>
      </MainContent>
      <Divider />
      <Footer>
        <FooterText>
          Ready to boost your team's productivity?{' '}
          <FooterLink href="/signup">Get Started with TaskRoom</FooterLink>
        </FooterText>
        <FooterText>&copy; {new Date().getFullYear()} TaskRoom Inc. All rights reserved.</FooterText>
        <div>
          <FooterLink href="#">Privacy Policy</FooterLink> |{' '}
          <FooterLink href="#">Terms of Use</FooterLink> |{' '}
          <FooterLink href="#">Sales and Refunds</FooterLink> |{' '}
          <FooterLink href="#">Legal</FooterLink> |{' '}
          <FooterLink href="#">Site Map</FooterLink>
        </div>
      </Footer>
    </FooterContainer>
  );
};

export default FooterC;
