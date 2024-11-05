import React from 'react';
import styled from 'styled-components';

const ContactUs = () => {
  return (
    <Container>
      <Card>
        <Title>Get in Touch</Title>
        <Subtitle>We're here to help! Reach out to us anytime.</Subtitle>
        <Form>
          <Label>Name</Label>
          <Input type="text" placeholder="Your Name" />
          <Label>Email</Label>
          <Input type="email" placeholder="Your Email" />
          <Label>Contact No</Label>
          <Input type="text" placeholder="Your Contact Number" />
          <Label>Message</Label>
          <Textarea placeholder="Your Message"></Textarea>
          <Button>Send Message</Button>
        </Form>
      </Card>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('images/contactbg.jpg');
  background-size: cover;
  height: 100vh;
  padding: 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgba(200, 200, 200, 0.28);
  backdrop-filter: blur(6.7px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 26px;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #fff;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  background:none;
  color: #fff;
  border-width: 0px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 2px rgba(255, 255, 255, 0.2); /* Bottom-only shadow */
  padding: 12px;
  margin-bottom: 15px;

 &:focus {
    outline: none;
    color: #fff;
    background: rgba(200,200,200,0.2);
  }

  &::placeholder{
    color: #fff;
  }
`;

const Textarea = styled.textarea`
  background: none;
  color: #fff;
  box-shadow: 0 4px 4px 2px rgba(255, 255, 255, 0.2); /* Bottom-only shadow */
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  height: 100px;
  resize: none;
  border-width: 0px;

  &:focus {
    outline: none;
    color: #fff;
    background: rgba(200,200,200,0.2);
  }

  &::placeholder{
    color: #fff;
  }
`;

const Button = styled.button`
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 4px 4px 2px rgba(255, 255, 255, 0.2); /* Bottom-only shadow */
  background: none;

  &:focus {
    outline: none;
    color: white;
    background: ${({theme})=>theme.colors.gradient};
    
    &::placeholder{
    color: white;
  }
  }

  &:hover {
    background: ${({theme})=>theme.colors.gradient};
    color: white;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export default ContactUs;
