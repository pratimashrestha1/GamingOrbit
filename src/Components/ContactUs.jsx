import React from 'react';
import styled from 'styled-components';

function ContactUs() {
  return (
    <Container>
      <div className="card">
        <h2 className="title">Get in Touch</h2>
        <p className="subtitle">We're here to help! Reach out to us anytime.</p>
        <form className="form" action={`${process.env.REACT_APP_API_BASE_URL}/postData/contact`} method="post">
          <label className="label">Name</label>
          <input type="text" className="input" placeholder="Your Name" name="name" required />
          
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Your Email" name="email" required />
          
          <label className="label">Contact No</label>
          <input type="text" className="input" placeholder="Your Contact Number" name="contact_no" required />
          
          <label className="label">Message</label>
          <textarea className="textarea" placeholder="Your Message" name="message" required></textarea>
          
          <button type="submit" className="button">Send Message</button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('images/contactbg.jpg') no-repeat center center/cover;
  padding: 20px;

  .card {
    width: 100%;
    max-width: 500px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .title {
    color: #fff;
    font-size: 28px;
    margin-bottom: 10px;
    text-align: center;
  }

  .subtitle {
    color: #ddd;
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .label {
    color: #fff;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .input, .textarea {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 15px;
    font-size: 16px;

    &::placeholder{
      color: #fff;
    }
  }

  .input:focus, .textarea:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }

  .textarea {
    height: 120px;
    resize: none;
  }

  .button {
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 65, 108, 0.5);
  }

  @media (max-width: 600px) {
    .card {
      padding: 25px;
    }

    .title {
      font-size: 24px;
    }

    .subtitle {
      font-size: 14px;
    }

    .input, .textarea {
      font-size: 14px;
      padding: 10px;
    }

    .button {
      font-size: 14px;
      padding: 10px;
    }
  }
`;

export default ContactUs;
