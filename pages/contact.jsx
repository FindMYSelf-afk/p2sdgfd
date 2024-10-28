// pages/contact.js

import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      purpose,
      email,
      message,
    };

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        alert('Your message has been sent!');
        // Reset the form
        setName('');
        setPurpose('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='flex flex-col bg-red-200 w-screen h-screen justify-center'>
      <div className='flex flex-col self-center border-2 rounded-lg w-fit px-10 border-[#e63b80] text-black'>
        <h1 className='font-extrabold text-[#e63b80] p-2 text-xl md:text-2xl text-center'>Contact for Brand Advertise</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className="flex flex-row justify-between gap-4 my-5 " >
          <label className=" font-extrabold text-[#e63b80]" htmlFor="name">Name:</label>
          <input
          className='rounded-lg py-2'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-between gap-4 my-5 " >
          <label className=" font-extrabold text-[#e63b80]" htmlFor="purpose">Purpose of Contact:</label>
          <input
          className='rounded-lg py-2'
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-between gap-4 my-5 " >
          <label className=" font-extrabold text-[#e63b80]" htmlFor="email">Email:</label>
          <input
          className='rounded-lg py-2'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-between gap-4 my-5 " >
          <label className=" font-extrabold text-[#e63b80]" htmlFor="message">Message:</label>
          <textarea
            id="message"
            className='px-2 rounded-lg'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className='font-medium text-white self-center bg-[#e63b80] py-2 md:py-4 px-5 md:px-10 mb-2 rounded-xl'> Send Message</button>
      </form>
      </div>
    </div>
  );
}
