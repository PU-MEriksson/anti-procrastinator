import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  color: #6c757d;
  padding: 1rem;
  text-align: center;
  margin-top: 2rem;
  border-top: 1px solid #e9ecef;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.9rem;
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <p>Momentum &copy; {currentYear}</p>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;