import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { showToast } from '../utils/toast';

const Contact = () => {

  const [form,setForm]= useState({name:"",email:"",message:""})
  const [status, setStatus] = useState('');
  const token= localStorage.getItem("token")
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!token) {
        showToast('error', 'Log in is required to send messages')
        
        setTimeout(() => {
          navigate("/login");
        }, 500);
        return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/contact`,form ,
        {headers:{Authorization:`Bearer ${token}`}}
      )
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message.');
    }
  }

  return (
    <section className="contact-page section-p1">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>We're here to help and answer any question you might have. We look forward to hearing from you! 😊</p>

        <div className="contact-details">
          <p><strong>📍 Address:</strong>Wayanad, kerala ,India</p>
          <p><strong>📞 Phone:</strong> +91 8921041726/ +91 24356787</p>
          <p><strong>📧 Email:</strong> support@carty.com</p>

          <div className="social-icons">
            <h4>Follow Us</h4>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-whatsapp"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-pinterest"></i>
          </div>
        </div>
      </div>

      <div className="contact-form">
        {status && <p>{status}</p>}
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={form.email} onChange={handleChange}  placeholder="Your Email" required />
          <textarea rows="5" name="message" value={form.message} onChange={handleChange}  placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
